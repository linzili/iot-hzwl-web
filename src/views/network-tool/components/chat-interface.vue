<script setup lang="ts">
import { message } from 'ant-design-vue'

const networkStore = useNetworkStore()

const enable = computed<boolean>(() => {
  return networkStore.connectionList.find((item) => item.client === networkStore.activeClient?.client)?.online === true
})

const contentType = ref<'Hex' | 'Ascii'>('Hex')

const inputMessage = ref<string>()

function hadnleSend() {
  if (inputMessage.value === undefined) {
    message.error('发送内容不能为空')
    return
  }
  if (contentType.value === 'Hex') {
    if (isHex(inputMessage.value)) {
      networkStore.handleSendMessage(inputMessage.value, 'Hex')
    } else {
      message.error('内容不符合 HEX 格式要求，请修正后再发送')
      return
    }
  } else {
    networkStore.handleSendMessage(inputMessage.value, 'Ascii')
  }
  inputMessage.value = undefined
}
</script>
<template>
  <!-- 消息内容 -->
  <message-list class="h-[calc(100%_-_10.5rem)] mb-2" />
  <!-- 输入框&工具栏 -->
  <a-card class="message-toolbar-container w-full h-40">
    <a-space class="w-full" direction="vertical">
      <div class="h-8 flex justify-between items-center">
        <div></div>
        <a-space>
          <a-radio-group v-model:value="contentType" size="small">
            <a-radio-button value="Hex">Hex</a-radio-button>
            <a-radio-button value="Ascii">Ascii</a-radio-button>
          </a-radio-group>
        </a-space>
      </div>
      <a-row :gutter="8">
        <a-col flex="auto">
          <a-textarea class="w-full" v-model:value="inputMessage" :disabled="!enable" :autosize="{ minRows: 4, maxRows: 4 }" allow-clear />
        </a-col>
        <a-col>
          <a-button class="h-full" :disabled="!enable" type="primary" @click="hadnleSend">发送</a-button>
        </a-col>
      </a-row>
    </a-space>
  </a-card>
</template>

<style scoped>
.message-toolbar-container :deep(.ant-card-body) {
  padding-top: 0.5rem;
}
</style>
