<script setup lang="ts">
import { message } from 'ant-design-vue'
import { ActionEnum, type Event, type connection, type messageInfo } from './types/'

import dayjs from 'dayjs'

const addr = ref()
const socket = ref<WebSocket>()
function handleConnection(type: 'tcp' | 'udp') {
  if (
    (socket.value && socket.value.readyState === WebSocket.OPEN) ||
    socket.value?.readyState === WebSocket.CONNECTING
  ) {
    message.error('请勿重复开启连接')
    return
  }

  socket.value = new WebSocket(`${import.meta.env.VITE_WS_URL}/network-debugger-tool`)
  handleMessage(socket.value)
  socket.value.onopen = () => {
    sendMessage(socket.value!!, {
      action: 'new',
      type
    })
  }

  socket.value.onclose = () => {
    socket.value = undefined
    addr.value = undefined
    conList.value.forEach((item) => (item.online = false))
  }
}

const conList = ref<connection[]>([])

const messageList = ref<Map<string, messageInfo[]>>(new Map())

function handleMessage(socket: WebSocket) {
  socket.onmessage = (event) => {
    try {
      const data: Event = JSON.parse(event.data)

      switch (data.action) {
        case ActionEnum.CONNECTED:
          conList.value.unshift({
            addr: data.addr!!,
            client: data.client!!,
            online: true
          })
          if (activeClient.value === undefined) {
            activeClient.value = data.client
          }
          break
        case ActionEnum.DATA:
          if (data.client && data.data) {
            pushMessage(data.client, data.data, 'receive', data.hex)
          }
          break
        case ActionEnum.DISCONNECT:
          conList.value.find((item) => item.client === data.client)!!.online = false
          break
        case ActionEnum.PORT:
          addr.value = `${data.host}:${data.port}`
          break
        default:
          message.error('消息格式不支持，请稍后重试')
      }
    } catch (error) {
      console.log(error)
      message.error('连接异常，请稍后重试')
    }
  }
}

function sendMessage(socket: WebSocket, msg: any): boolean {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(msg))
    return true
  } else {
    message.error('连接异常，请刷新重试')
    return false
  }
}

function handleDisConnection() {
  socket.value?.close()
}

const activeClient = ref()

const currentMessageList = computed(() => messageList.value.get(activeClient.value) || [])

function handleSendMessage(content: string, type: 'Hex' | 'Ascii') {
  if (socket.value) {
    const data: Event = {
      action: ActionEnum.SEND,
      data: content,
      client: activeClient.value,
      hex: type === 'Hex'
    }
    if (sendMessage(socket.value, data)) {
      pushMessage(activeClient.value, content, 'send', type === 'Hex')
    }
  }
}

function pushMessage(client: string, data: string, type: 'receive' | 'send', isHex = true) {
  if (!messageList.value.has(client)) {
    messageList.value.set(client, [])
  }

  messageList.value.get(client)!!.push({
    hex: isHex ? data : stringToHex(data),
    ascii: isHex ? hexToString(data) : data,
    time: dayjs().format('HH:mm:ss.SSS'),
    type
  })
}

function handleClear() {
  messageList.value.delete(activeClient.value)
}
</script>

<template>
  <!-- 顶部工具 -->
  <tool-header @on-open="handleConnection" @on-close="handleDisConnection" :addr="addr" />
  <a-row :gutter="16" class="h-[calc(100%_-_6rem)]">
    <!-- 连接列表 -->
    <a-col class="w-80 h-full">
      <connection-list v-model:activeClient="activeClient" :list="conList" />
    </a-col>

    <a-col class="w-[calc(100%_-_48rem)] h-full">
      <message-toolbar
        :enable="activeClient !== undefined && conList.find((item) => item.client === activeClient)?.online === true"
        :message-list="currentMessageList"
        @on-send="handleSendMessage"
        @on-clear="handleClear"
      />
    </a-col>

    <a-col class="h-full" style="width: 28rem">
      <quick-operator />
    </a-col>
  </a-row>
</template>

<style scoped>
:deep(.message-container) .ant-card-body {
  height: 100%;
  padding: 0 1rem;
  overflow-y: auto;
}
:deep(.message-toolbar-container) .ant-card-body {
  padding-top: 0.5rem;
}

:deep(.oper-card) .ant-card-body {
  height: calc(100% - 3.5rem);
}
:deep(.oper-tab) .ant-tabs-content-holder {
  height: 100%;
  overflow-y: auto;
}
</style>
