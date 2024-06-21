import type { IParseConfig, IReadConfig } from '../types'
import dayjs from 'dayjs'

export default function useModbusParse() {
  const readConfig = reactive<IReadConfig>({
    slaveAddress: '34',
    functionCode: '3',
    registerAddress: '6',
    registerCount: '1',
    checkType: 'CRC16'
  })
  const readCommand = computed(() => {
    const { slaveAddress, functionCode, registerAddress, registerCount } = readConfig
    const slaveAddressHex = slaveAddress?.padStart(2, '0') || '00'
    const functionCodeHex = functionCode?.padStart(2, '0') || '00'
    const registerAddressHex = registerAddress?.padStart(4, '0') || '0000'
    const registerCountHex = registerCount?.padStart(4, '0') || '0000'

    const command = `${slaveAddressHex}${functionCodeHex}${registerAddressHex}${registerCountHex}`
    let checkCode
    if (readConfig.checkType === 'CRC16') {
      checkCode = CRC.calculateCrc16Modbus(hexToUint8Array(command))
    }

    return (command + checkCode).toUpperCase()
  })

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
          dayjs(message.time, HH_mm_ss_SSS).isAfter(dayjs(lastSendTime.value, HH_mm_ss_SSS))
        )
      })
      if (dataList.length > 0) {
        loading.value = false
        return dataList[dataList.length - 1].hex
      }
    }
    return ''
  })
  function handleSendReadCommand() {
    identified.value = readCommand.value.slice(0, 4)
    lastSendTime.value = dayjs().format(HH_mm_ss_SSS)
    loading.value = true
    networkStore.handleSendMessage(readCommand.value, 'Hex')
  }

  const parseConfigList = ref<IParseConfig[]>([
    {
      startAddress: undefined,
      charCount: undefined,
      charOrder: undefined,
      dataType: undefined,
      checkType: 'CRC16'
    }
  ])

  return { readCommand, readConfig, sourceData, loading, handleSendReadCommand, parseConfigList }
}
