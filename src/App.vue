<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { theme } from 'ant-design-vue'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh')
</script>

<template>
  <div class="h-screen">
    <a-config-provider
      :locale="zhCN"
      :theme="{
        algorithm: theme.defaultAlgorithm
      }"
    >
      <router-view />
    </a-config-provider>
  </div>
</template>

<style scoped></style>
