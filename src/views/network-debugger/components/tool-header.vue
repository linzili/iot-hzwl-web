<script setup lang="ts">
const props = defineProps<{
  addr?: string
  loading?: 'tcp' | 'udp'
}>()
const emit = defineEmits<{
  onOpen: [type: 'tcp' | 'udp']
  onClose: []
}>()
</script>
<template>
  <a-card class="h-20 mb-4 p-0">
    <a-space :size="24">
      <span class="text-2xl font-bold">网络调试工具</span>
      <a-typography-text class="text-base">
        服务器:
        <a-typography-text class="text-base" :strong="props.addr !== undefined" :copyable="props.addr !== undefined">
          {{ props.addr ? props.addr : '暂未开启' }}
        </a-typography-text>
      </a-typography-text>

      <div v-if="props.addr === undefined">
        <a-space>
          <a-button @click="emit('onOpen', 'tcp')" :loading="props.loading === 'tcp'">打开 tcp 连接</a-button>
          <a-button @click="emit('onOpen', 'udp')" :loading="props.loading === 'udp'">打开 udp 连接</a-button>
        </a-space>
      </div>
      <a-button v-else @click="emit('onClose')">断开连接</a-button>
    </a-space>
  </a-card>
</template>
