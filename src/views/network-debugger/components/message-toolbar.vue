<script setup lang="ts">
const { token } = useToken()
import hexUtil from '@/utils/hexUtils'

const data = [
  {
    time: '2024-05-24 09:32:27.118',
    hex: '313233'
  },
  {
    time: '2024-05-24 09:32:27.118',
    hex: '313233647761'
  },
  {
    time: '2024-05-24 09:32:27.118',
    hex: '4745542f485454502f312e31e2ac85efb88f'
  },
  {
    time: '2024-05-24 09:32:27.118',
    hex: '557067726164652d496e7365637572652d52657175657374733a31e2ac85efb88f'
  },
  {
    time: '2024-05-24 09:32:27.118',
    hex: '557067726164652d496e7365637572652d52657175657374733a31e2ac85efb88f'
  },
  {
    time: '2024-05-24 09:32:27.118',
    hex: '557067726164652d496e7365637572652d52657175657374733a31e2ac85efb88f'
  },
  {
    time: '2024-05-24 09:32:27.118',
    hex: '557067726164652d496e7365637572652d52657175657374733a31e2ac85efb88f'
  },
  {
    time: '2024-05-24 09:32:27.118',
    hex: '557067726164652d496e7365637572652d52657175657374733a31e2ac85efb88f'
  },
  {
    time: '2024-05-24 09:32:27.118',
    hex: 'e4b8ade69687'
  }
]

const value1 = ref('Hex')
</script>
<template>
  <!-- 消息内容 -->
  <a-card class="message-container w-full h-[calc(100%_-_15rem)] mb-4 pt-6 pb-6">
    <div class="flex flex-col">
      <div
        v-for="(item, index) in data"
        :key="item.time"
        class="p-4 mb-4 rounded-lg"
        :class="{ 'self-end': index % 2 !== 0 }"
        :style="{ backgroundColor: token.colorBgLayout, maxWidth: '80%', width: 'fit-content' }"
      >
        <a-typography-paragraph :class="{ 'text-right': index % 2 !== 0 }" :style="{ color: token.colorPrimary }">
          {{ item.time }}
        </a-typography-paragraph>
        <a-typography-paragraph class="whitespace-pre-wrap">
          {{ hexUtil.hexToString(item.hex) }}
        </a-typography-paragraph>
        <a-typography-text type="secondary">{{ item.hex }}</a-typography-text>
      </div>
    </div>
  </a-card>
  <!-- 输入框&工具栏 -->
  <a-card class="message-toolbar-container w-full h-56">
    <a-space direction="vertical" class="w-full">
      <div class="h-8 flex justify-between items-center">
        <a-space>
          <a-checkbox>显示Hex</a-checkbox>
        </a-space>
        <a-button size="small">清空</a-button>
      </div>
      <a-textarea :autosize="{ minRows: 4, maxRows: 4 }" allow-clear :maxlength="1000" show-count />
    </a-space>
    <div class="h-8 flex justify-between">
      <a-radio-group v-model:value="value1">
        <a-radio-button value="Hex">Hex</a-radio-button>
        <a-radio-button value="Ascii">Ascii</a-radio-button>
      </a-radio-group>
      <a-button class="items-end">发送</a-button>
    </div>
  </a-card>
</template>
