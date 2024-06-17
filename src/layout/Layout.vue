<script setup lang="ts">
import type { ItemType, MenuProps } from 'ant-design-vue'
import type { SubMenuType } from 'ant-design-vue/es/menu/src/interface'

import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'

const { token } = useToken()
const route = useRoute()
const router = useRouter()
const selectedKeys = ref<string[]>([])
const selectTopKey = ref<string[]>([])

const menus = ref<MenuProps['items']>([])
const topMenus = ref<MenuProps['items']>([])

const isSubMenuType = (item: any): item is SubMenuType => {
  return item && 'children' in item
}

const subMenus = computed<MenuProps['items']>(() => {
  const subMenu = menus.value?.find((item) => item?.key === selectTopKey.value[0])
  if (isSubMenuType(subMenu)) {
    return subMenu.children as ItemType[]
  }
  return []
})

// 从路由配置动态生成菜单
const generateMenuItems = (routes: RouteRecordRaw[]): MenuProps['items'] => {
  return routes.map((route) => {
    const children = route.children ? generateMenuItems(route.children) : undefined
    return {
      key: route.name?.toString() || '',
      label: route.meta?.title,
      children: children?.length ? children : undefined
    }
  })
}

const updateSelectedKeys = (newRoute: RouteLocationNormalizedLoaded) => {
  selectedKeys.value = [newRoute.name?.toString() || '']
  selectTopKey.value = [newRoute.matched[1]?.name?.toString() || '']
}

const handleRouteChange = (value: string[]) => {
  if (value.length > 0 && value[0] !== route.name?.toString()) {
    router.push({ name: value[0] })
  }
}

onMounted(() => {
  const layoutRouter = router.getRoutes().find((route) => route.name === 'Layout')
  if (layoutRouter && layoutRouter.children) {
    menus.value = generateMenuItems(layoutRouter.children)
    topMenus.value = layoutRouter.children.map((route) => {
      return {
        key: route.name?.toString() || '',
        label: route.meta?.title
      }
    })
  }
})
watch(route, updateSelectedKeys, { immediate: true })
watch(selectedKeys, handleRouteChange)
</script>

<template>
  <a-layout class="h-screen min-h-[940px] min-w-[1600px]">
    <a-layout-header :style="{ background: token.colorBgContainer }">
      <a-menu v-model:selected-keys="selectTopKey" mode="horizontal" :items="topMenus" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider :style="{ background: token.colorBgContainer }">
        <a-menu v-model:selected-keys="selectedKeys" mode="inline" :items="subMenus" />
      </a-layout-sider>
      <a-layout-content class="p-4">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped></style>
