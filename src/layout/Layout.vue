<script setup lang="ts">
import type { MenuProps } from 'ant-design-vue'
import type { RouteRecordRaw } from 'vue-router'

const { token } = useToken()
const route = useRoute()
const router = useRouter()
const selectedKeys = ref<string[]>([])

const items = ref<MenuProps['items']>([])

// 从路由配置动态生成菜单
const generateMenuItems = (routes: RouteRecordRaw[]) => {
  const menuItems: MenuProps['items'] = []
  routes.forEach((route) => {
    if (route.children) {
      const children = generateMenuItems(route.children)
      if (children.length > 0) {
        menuItems.push({
          key: route.path,
          label: route.meta?.title,
          children
        })
      }
    } else {
      menuItems.push({
        key: route.path,
        label: route.meta?.title
      })
    }
  })
  return menuItems
}
watch(
  route,
  (newRoute) => {
    selectedKeys.value = [newRoute.path]
  },
  {
    immediate: true
  }
)

watch(selectedKeys, (value) => {
  if (value.length > 0 && value[0] !== route.path) {
    router.push(value[0])
  }
})

onMounted(() => {
  const layoutRouter = router.getRoutes().find((route) => route.name === 'Layout')
  if (layoutRouter && layoutRouter.children) {
    items.value = generateMenuItems(layoutRouter.children)
  }
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
