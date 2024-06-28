<script setup lang="ts">
const networkStore = useNetworkStore()

onUnmounted(() => {
  networkStore.handleStopConnection()
})
</script>

<template>
  <!-- 顶部工具 -->
  <tool-header />
  <a-row :gutter="16" class="h-[calc(100%_-_6rem)]">
    <!-- 连接列表 -->
    <a-col class="w-80 h-full">
      <connection-list />
    </a-col>
    <a-col class="w-[calc(100%_-_20rem)] h-full">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </a-col>
  </a-row>
</template>
