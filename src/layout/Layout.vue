<script setup lang="ts">
import type { MenuProps } from 'ant-design-vue'

const { token } = useToken()
const route = useRoute()
const router = useRouter()
const selectedKeys = ref<string[]>([])
const items = ref<MenuProps['items']>([
  {
    key: '/network-tool',
    label: '物联工具',
    children: [
      {
        key: '/connection-test',
        label: '连接测试'
      },
      {
        key: '/serial-port',
        label: '串口映射'
      }
    ]
  }
])

watch(selectedKeys, (value) => {
  if (value.length > 0 && value[0] !== route.path) {
    router.push(value[0])
  }
})

onMounted(() => {
  selectedKeys.value = [route.path]
})
</script>

<template>
  <a-layout class="h-screen min-h-[940px] min-w-[1600px]">
    <a-layout-header :style="{ background: token.colorBgContainer }">
      <a-menu v-model:selected-keys="selectedKeys" mode="horizontal" :items="items" />
    </a-layout-header>
    <a-layout>
      <!--      <a-layout-sider>Sider</a-layout-sider>-->
      <a-layout-content class="p-4">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped></style>
