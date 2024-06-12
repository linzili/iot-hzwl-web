<script setup lang="ts">
type tabPaneKey = 'oper' | 'history'

const activeKey = ref<tabPaneKey>('oper')
</script>

<template>
  <a-row class="h-full" :gutter="16">
    <a-col class="w-[calc(100%_-_28rem)] h-full">
      <message-toolbar />
    </a-col>

    <a-col class="h-full" style="width: 28rem">
      <!-- 快捷操作 -->
      <a-card class="oper-card w-full h-full" title="快捷操作">
        <a-tabs v-model:activeKey="activeKey" class="oper-tab h-full" tab-position="top">
          <a-tab-pane key="oper" tab="快捷指令"> </a-tab-pane>
          <a-tab-pane key="history" tab="历史发送"></a-tab-pane>
        </a-tabs>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>
:deep(.oper-card) .ant-card-body {
  height: calc(100% - 3.5rem);
}
:deep(.oper-tab) .ant-tabs-content-holder {
  height: 100%;
  overflow-y: auto;
}
</style>
