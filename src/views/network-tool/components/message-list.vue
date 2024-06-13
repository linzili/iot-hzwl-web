<script setup lang="ts">
const { token } = useToken()
const showTime = ref<boolean>(true)

// 展示数据类型
const showType = ref<'Hex' | 'Ascii'>('Hex')

const networkStore = useNetworkStore()

const messageContainer = ref<HTMLDivElement>()
// 监听消息列表变化，滚动到底部
watch(
  () => networkStore.currentMessageList,
  () => {
    nextTick(() => {
      if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight
      }
    })
  },
  { deep: true }
)

function handleClear() {
  networkStore.handleClearCurrentMessageList()
}
</script>

<template>
  <a-card class="message-container w-full pt-4">
    <div ref="messageContainer" class="h-[calc(100%_-_2.5rem)] overflow-auto">
      <div v-for="item in networkStore.currentMessageList" :key="item.time" class="mb-4" :style="{ maxWidth: '90%' }">
        <div class="inline-block p-2 rounded-lg" :style="{ backgroundColor: token.colorBgLayout, maxWidth: '90%' }">
          <a-row :gutter="16">
            <a-col v-if="showTime">
              <a-typography-text :style="{ color: token.colorPrimary }"> [{{ item.time }}] </a-typography-text>
            </a-col>
            <a-col>
              <a-typography-text strong> {{ item.type === 'receive' ? '<<' : '>>' }} </a-typography-text>
            </a-col>
            <a-col>
              <a-typography-text class="whitespace-pre-wrap">
                {{ showType === 'Ascii' ? item.ascii : item.hex }}
              </a-typography-text>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
    <div class="h-8 flex justify-between items-center">
      <a-space>
        <a-checkbox v-model:checked="showTime">显示时间</a-checkbox>
        <a-radio-group v-model:value="showType" size="small">
          <a-radio-button value="Hex">Hex</a-radio-button>
          <a-radio-button value="Ascii">Ascii</a-radio-button>
        </a-radio-group>
      </a-space>
      <a-button size="small" @click="handleClear">清空</a-button>
    </div>
  </a-card>
</template>

<style scoped>
.message-container :deep(.ant-card-body) {
  height: 100%;
  padding: 0 1rem;
  overflow-y: auto;
}
</style>
