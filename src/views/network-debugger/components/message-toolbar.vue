<script setup lang="ts">
import hexUtils from '@/utils/hexUtils'
import type { messageInfo } from '../types'
import { message } from 'ant-design-vue'

const { token } = useToken()

const props = defineProps<{
  messageList: messageInfo[]
  enable: boolean
}>()

const emit = defineEmits<{
  onClear: []
  onSend: [message: string, type: 'Hex' | 'Ascii']
}>()

const showHex = ref<boolean>()
const showTime = ref<boolean>(true)
const contentType = ref<'Hex' | 'Ascii'>('Hex')

const messageContainer = ref<HTMLDivElement>()
watch(
  () => props.messageList,
  () => {
    nextTick(() => {
      if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight
      }
    })
  },
  { deep: true }
)

const inputMessage = ref<string>()

function hadnleSend() {
  if (inputMessage.value === undefined) {
    message.error('发送内容不能为空')
    return
  }
  if (contentType.value === 'Hex') {
    if (hexUtils.isHex(inputMessage.value)) {
      emit('onSend', inputMessage.value, 'Hex')
    } else {
      message.error('内容不符合 HEX 格式要求，请修正后再发送')
      return
    }
  } else {
    emit('onSend', inputMessage.value, 'Ascii')
  }
  inputMessage.value = undefined
}
</script>
<template>
  <!-- 消息内容 -->
  <a-card class="message-container w-full h-[calc(100%_-_10.5rem)] mb-2 pt-4">
    <div ref="messageContainer" class="h-[calc(100%_-_2.5rem)] overflow-auto">
      <div v-for="item in props.messageList" :key="item.time" class="mb-4" :style="{ maxWidth: '90%' }">
        <div class="inline-block p-2 rounded-lg" :style="{ backgroundColor: token.colorBgLayout, maxWidth: '90%' }">
          <a-row :gutter="16">
            <a-col>
              <a-typography-text strong> {{ item.type === 'receive' ? '<<' : '>>' }} </a-typography-text>
            </a-col>
            <a-col v-if="showTime">
              <a-typography-text :style="{ color: token.colorPrimary }"> [{{ item.time }}] </a-typography-text>
            </a-col>
            <a-col>
              <a-typography-text class="whitespace-pre-wrap">
                {{ item.ascii }}
              </a-typography-text>
            </a-col>
          </a-row>

          <a-typography-text type="secondary" v-if="showHex">{{ item.hex }}</a-typography-text>
        </div>
      </div>
    </div>
    <div class="h-8 flex justify-between items-center">
      <a-space>
        <a-checkbox v-model:checked="showHex">显示Hex</a-checkbox>
        <a-checkbox v-model:checked="showTime">显示时间</a-checkbox>
      </a-space>
      <a-button size="small" @click="emit('onClear')">清空</a-button>
    </div>
  </a-card>
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
          <a-textarea
            class="w-full"
            v-model:value="inputMessage"
            :disabled="!enable"
            :autosize="{ minRows: 4, maxRows: 4 }"
            allow-clear
          />
        </a-col>
        <a-col>
          <a-button class="h-full" :disabled="!enable" type="primary" @click="hadnleSend">发送</a-button>
        </a-col>
      </a-row>
    </a-space>
  </a-card>
</template>
