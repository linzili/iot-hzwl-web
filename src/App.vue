<script setup lang="ts">
import NetworkDebugger from '@/views/network-debugger/NetworkDebugger.vue'
import { theme } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
const title = useTitle()
title.value = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <a-config-provider
    :locale="zhCN"
    :theme="{
      algorithm: theme.defaultAlgorithm
    }"
  >
    <div>
      <a-layout class="h-screen">
        <a-layout-header> </a-layout-header>
        <a-layout>
          <a-layout-sider>Sider</a-layout-sider>
          <a-layout-content class="p-4">
            <network-debugger />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
  </a-config-provider>
</template>

<style scoped></style>
