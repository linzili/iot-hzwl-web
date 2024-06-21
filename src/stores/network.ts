import type { Comm } from '@/hooks/useComm'
import { ActionEnum, type connection, type Event, type messageInfo } from '@/views/network-tool/types'
import { message, notification } from 'ant-design-vue'
import dayjs from 'dayjs'

export const useNetworkStore = defineStore('network-tool', () => {
  const socket = ref<WebSocket>()
  const connectionLoading = ref<'tcp' | 'udp'>()
  const addr = ref()

  // 处理打开连接
  function handleOpenConnection(type: 'tcp' | 'udp') {
    connectionLoading.value = type
    if ((socket.value && socket.value.readyState === WebSocket.OPEN) || socket.value?.readyState === WebSocket.CONNECTING) {
      connectionLoading.value = undefined
      message.error('请勿重复开启连接')
      return
    }

    socket.value = new WebSocket(`${import.meta.env.VITE_WS_URL}/network-debugger-tool`)
    handleMessage(socket.value)

    // 处理连接成功
    socket.value.onopen = () => {
      sendMessage({
        action: ActionEnum.NEW,
        type
      })
      connectionLoading.value = undefined
    }

    // 处理异常
    socket.value.onerror = () => {
      connectionLoading.value = undefined
      message.error('连接失败，请稍后再试')
    }
  }
  // 处理消息
  function handleMessage(socket: WebSocket) {
    socket.onmessage = (event) => {
      try {
        const data: Event = JSON.parse(event.data)
        switch (data.action) {
          case ActionEnum.CONNECTED:
            newConnect(data)
            break
          case ActionEnum.DATA:
            if (data.client && data.data) {
              pushMessage(data.client, data.data, 'receive', data.hex)

              if (data.client === activeClient.value?.client && comm.value !== undefined) {
                comm.value.send(data.data)
              }
            }
            break
          case ActionEnum.DISCONNECT:
            connectionList.value.forEach((item) => {
              if (item.client === data.client) {
                item.online = false
              }
            })
            break
          case ActionEnum.PORT:
            addr.value = `${data.host}:${data.port}`
            break
          default:
            message.error('消息格式不支持，请稍后重试')
        }
      } catch (error) {
        message.error('连接异常，请稍后重试')
      }
    }
  }
  // 发送消息到连接
  function sendMessage(msg: Event): boolean {
    if (socket.value && socket.value.readyState === WebSocket.OPEN) {
      socket.value.send(JSON.stringify(msg))
      return true
    } else {
      message.error('连接异常，请刷新重试')
      return false
    }
  }

  // 处理断开连接
  function handleStopConnection() {
    if (socket.value?.readyState === WebSocket.OPEN) {
      socket.value.close()
      socket.value = undefined
      addr.value = undefined
      closeAllConnection()
    }
  }

  // 处理发送消息
  function handleSendMessage(content: string, type: 'Hex' | 'Ascii') {
    const data: Event = {
      action: ActionEnum.SEND,
      data: content,
      client: activeClient.value?.client,
      hex: type === 'Hex'
    }
    if (sendMessage(data)) {
      pushMessage(activeClient.value!!.client, content, 'send', type === 'Hex')
    }
  }

  const connectionList = ref<connection[]>([])
  const activeClient = ref<connection>()
  function newConnect(data: Event) {
    connectionList.value.unshift({
      addr: data.addr!!,
      client: data.client!!,
      online: true
    })
    if (activeClient.value === undefined) {
      activeClient.value = connectionList.value[0]
    }
  }
  function closeAllConnection() {
    connectionList.value.forEach((item) => (item.online = false))
  }

  const messageMap = ref<Map<string, messageInfo[]>>(new Map())
  const currentMessageList = computed(() => messageMap.value.get(activeClient.value?.client || '') || [])

  function pushMessage(client: string, data: string, type: 'receive' | 'send', isHex = true) {
    if (!messageMap.value.has(client)) {
      messageMap.value.set(client, [])
    }

    messageMap.value.get(client)!!.push({
      hex: isHex ? data : stringToHex(data),
      ascii: isHex ? hexToString(data) : data,
      time: dayjs().format(HH_mm_ss_SSS),
      type
    })
  }

  function handleClearCurrentMessageList() {
    if (activeClient.value != undefined) {
      messageMap.value.delete(activeClient.value.client)
    }
  }

  const { getCommList, openComm } = useComm()
  const commList = ref<ComPort[]>([])
  const comm = ref<Comm>()
  const isNotice = ref(false)
  async function handleGetCommList() {
    try {
      commList.value = []
      commList.value = await getCommList()
    } catch (e: any) {
      if (e.message === '插件未安装') {
        if (isNotice.value === false) {
          isNotice.value = true
          notification.open({
            message: '插件未安装',
            description: '点击下载并安装串口映射插件后重试',
            onClick: () => {
              window.open('https://d.iyanhong.com/files/TCtrls.exe')
            },
            type: 'info',
            duration: null
          })
        }
      } else {
        message.error('获取串口列表失败')
      }
    }
  }
  async function handleOpenComm(properties: CommProperties) {
    try {
      comm.value = await openComm(properties, (data) => {
        handleSendMessage(data.data, 'Hex')
      })
    } catch (e: any) {
      message.error('打开串口失败')
    }
  }
  function handleCloseComm() {
    comm.value?.close()
    comm.value = undefined
  }

  watch(
    () => activeClient.value,
    (value) => {
      if (value === undefined || value.online === false) {
        if (comm.value !== undefined) {
          handleCloseComm()
          message.warning('串口映射已关闭')
        }
      }
    },
    {
      deep: true
    }
  )
  return {
    connectionLoading,
    addr,
    handleOpenConnection,
    handleStopConnection,
    handleSendMessage,
    connectionList,
    activeClient,
    currentMessageList,
    handleClearCurrentMessageList,
    openComm,
    commList,
    comm,
    handleGetCommList,
    handleOpenComm,
    handleCloseComm
  }
})
