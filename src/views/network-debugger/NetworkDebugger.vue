<script setup lang="ts"></script>

<template>
  <tool-header />
  <a-row :gutter="16" class="h-[calc(100%_-_6rem)]">
    <!-- 连接列表 -->
    <a-col class="w-80 h-full">
      <connection-list />
    </a-col>

    <a-col class="w-[calc(100%_-_48rem)] h-full">
      <message-toolbar />
    </a-col>

    <a-col class="h-full" style="width: 28rem">
      <quick-operator />
    </a-col>
  </a-row>
</template>

<style scoped>
:deep(.message-container) .ant-card-body {
  height: 100%;
  padding: 0 1.5rem;
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
