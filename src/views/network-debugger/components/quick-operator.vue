<script setup lang="ts">
const activeKey = ref('history')
</script>
<template>
  <!-- 快捷操作 -->
  <a-card class="oper-card w-full h-full" title="快捷操作">
    <a-tabs v-model:activeKey="activeKey" class="oper-tab h-full" tab-position="top">
      <a-tab-pane key="oper" tab="快捷指令"></a-tab-pane>
      <a-tab-pane key="history" tab="历史发送"></a-tab-pane>
    </a-tabs>
  </a-card>
</template>
