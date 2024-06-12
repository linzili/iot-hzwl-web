<script setup lang="ts">
import { theme, type MenuProps } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const title = useTitle()
title.value = import.meta.env.VITE_APP_TITLE

const { token } = useToken()

const items = ref<MenuProps['items']>([
  {
    key: 'network-tool',
    label: '物联工具',
    children: [
      {
        key: 'connection-test',
        label: '连接测试'
      },
      {
        key: 'serial-port',
        label: '串口映射'
      }
    ]
  }
])
</script>

<template>
  <serial-mapping />
  <a-config-provider
    :locale="zhCN"
    :theme="{
      algorithm: theme.defaultAlgorithm
    }"
  >
    <div>
      <a-layout class="h-screen">
        <a-layout-header :style="{ background: token.colorBgContainer }">
          <a-menu mode="horizontal" :items="items" />
        </a-layout-header>
        <a-layout>
          <!-- <a-layout-sider>Sider</a-layout-sider> -->
          <a-layout-content class="p-4">
            <router-view />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
  </a-config-provider>
</template>

<style scoped></style>
