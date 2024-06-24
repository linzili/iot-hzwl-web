import dayUtil from '@/utils/day'
import type { IParseConfig, IReadConfig } from '../types'
import { message } from 'ant-design-vue'

export default function useModbusParse() {
  const initialReadConfig = reactive<IReadConfig>({
    slaveAddress: undefined,
    functionCode: undefined,
    registerAddress: undefined,
    registerCount: undefined,
    checkType: 'CRC16'
  })
  const readConfig = reactive<IReadConfig>({
    ...initialReadConfig
  })
  const readCommand = computed(() => {
    const { slaveAddress, functionCode, registerAddress, registerCount } = readConfig
    if (!slaveAddress || !functionCode || !registerAddress || !registerCount) {
      return ''
    }
    const slaveAddressHex = slaveAddress.padStart(2, '0')
    const functionCodeHex = functionCode.padStart(2, '0')
    const registerAddressHex = registerAddress.padStart(4, '0')
    const registerCountHex = registerCount.padStart(4, '0')

    const command = `${slaveAddressHex}${functionCodeHex}${registerAddressHex}${registerCountHex}`
    let checkCode
    if (readConfig.checkType === 'CRC16') {
      checkCode = CRC.calculateCrc16Modbus(hexToUint8Array(command))
    }

    return (command + checkCode).toUpperCase()
  })

  function setLoading() {
    loading.value = true
    setTimeout(() => {
      if (loading.value === true) {
        loading.value = false
        message.warning('读取超时')
      }
    }, 5000)
  }

  function handleSendReadCommand() {
    if (readCommand.value === '') {
      return message.warning('读取参数配置错误')
    }
    identified.value = readCommand.value.slice(0, 4)
    lastSendTime.value = dayUtil().format(HH_mm_ss_SSS)
    setLoading()
    networkStore.handleSendMessage(readCommand.value, 'Hex')
  }
  const networkStore = useNetworkStore()

  const identified = ref<string>()
  const lastSendTime = ref<string>()
  const loading = ref(false)
  const sourceData = computed(() => {
    if (identified.value !== undefined) {
      const dataList = networkStore.currentMessageList.filter((message) => {
        return (
          message.hex.startsWith(identified.value!!) &&
          message.type === 'receive' &&
          dayUtil(message.time, HH_mm_ss_SSS).isAfter(dayUtil(lastSendTime.value, HH_mm_ss_SSS))
        )
      })

      if (dataList.length > 0) {
        loading.value = false
        return dataList[dataList.length - 1].hex
      }
    }
    return ''
  })

  const initialParseConfig: IParseConfig[] = [
    {
      startAddress: undefined,
      charCount: undefined,
      charOrder: undefined,
      dataType: undefined,
      checkType: 'CRC16'
    }
  ]
  const parseConfigList = ref<IParseConfig[]>(initialParseConfig)
  function handleReset() {
    Object.assign(readConfig, initialReadConfig)
    parseConfigList.value = initialParseConfig
    loading.value = false
  }
  watch(
    () => networkStore.activeClient,
    () => {
      handleReset()
    }
  )

  return { readCommand, readConfig, sourceData, loading, handleSendReadCommand, parseConfigList }
}
