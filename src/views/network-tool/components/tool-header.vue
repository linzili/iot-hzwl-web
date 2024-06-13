<script setup lang="ts">
const networkStore = useNetworkStore()
</script>
<template>
  <a-card class="h-20 mb-4 p-0">
    <a-space :size="24">
      <span class="text-xl font-bold">{{ networkStore.mode === 'connection-test' ? '连接测试' : '串口映射' }}</span>
      <a-typography-text class="text-base">
        服务器:
        <a-typography-text class="text-base" :strong="networkStore.addr !== undefined" :copyable="networkStore.addr !== undefined">
          {{ networkStore.addr ? networkStore.addr : '暂未开启' }}
        </a-typography-text>
      </a-typography-text>

      <div v-if="networkStore.addr === undefined">
        <a-space>
          <a-button @click="networkStore.handleOpenConnection('tcp')" :loading="networkStore.connectionLoading === 'tcp'">打开 tcp 连接</a-button>
          <a-button @click="networkStore.handleOpenConnection('udp')" :loading="networkStore.connectionLoading === 'udp'">打开 udp 连接</a-button>
        </a-space>
      </div>
      <a-button v-else @click="networkStore.handleStopConnection">断开连接</a-button>
    </a-space>
  </a-card>
</template>
