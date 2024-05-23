<script setup lang="ts">
import NetworkDebugger from '@/views/network-debugger/NetworkDebugger.vue'

const title = useTitle()
title.value = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <div class="bg-white">
    <a-layout class="min-h-screen">
      <a-layout-header>Header</a-layout-header>
      <a-layout>
        <a-layout-sider>Sider</a-layout-sider>
        <a-layout-content class="p-4">
          <NetworkDebugger />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<style scoped></style>
