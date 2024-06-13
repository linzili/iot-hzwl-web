<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { theme } from 'ant-design-vue'

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
    <router-view />
  </a-config-provider>
</template>

<style scoped></style>
