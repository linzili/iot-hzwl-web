<script setup lang="ts">
import type { ItemType, MenuProps } from 'ant-design-vue'
import type { SubMenuType } from 'ant-design-vue/es/menu/src/interface'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'

const dictStore = useDictStore()

const { token } = useToken()
const route = useRoute()
const router = useRouter()
const selectedKeys = ref<string[]>([])
const selectTopKey = ref<string[]>([])
const openKeys = ref<string[]>([])
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
  return routes
    .filter((route) => route.meta?.hidden !== true)
    .map((route) => {
      const children =
        route.children && route.children.filter((route) => route.meta?.hidden !== true).length > 0 ? generateMenuItems(route.children) : undefined
      return {
        key: route.name?.toString() || '',
        label: route.meta?.title,
        children: children?.length ? children : undefined
      }
    })
}

const updateSelectedKeys = (newRoute: RouteLocationNormalizedLoaded) => {
  selectedKeys.value = [(newRoute.meta.activeMenu as string) || newRoute.name?.toString() || '']
  selectTopKey.value = [newRoute.matched[1]?.name?.toString() || '']
  openKeys.value = newRoute.matched.filter((route, index) => index !== 0 && route.name !== newRoute.name).map((route) => route.name!.toString())
}

onMounted(async () => {
  const layoutRouter = router.getRoutes().find((route) => route.name === 'Layout')
  if (layoutRouter && layoutRouter.children) {
    menus.value = generateMenuItems(layoutRouter.children)
    topMenus.value = layoutRouter.children.map((route) => ({
      key: route.name?.toString() || '',
      label: route.meta?.title
    }))
  }
  dictStore.getSimpleDictListAction()
})
watch(route, updateSelectedKeys, { immediate: true })
</script>

<template>
  <a-layout class="min-h-[940px] min-w-[1600px] h-screen">
    <a-layout-header :style="{ background: token.colorBgContainer }">
      <a-menu v-model:selected-keys="selectTopKey" mode="horizontal" :items="topMenus" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider :style="{ background: token.colorBgContainer }">
        <a-menu
          v-model:selected-keys="selectedKeys"
          :items="subMenus"
          :open-keys="openKeys"
          mode="inline"
          @click="({ key }) => router.push({ name: key.toString() })"
        />
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="p-4 pb-0">
          <Breadcrumb />
          <router-view />
        </a-layout-content>
        <a-layout-footer class="text-center h-10 footer">
          <a class="hover:text-gray-400 text-gray-400" href="https://beian.miit.gov.cn/" target="_blank"> 鲁ICP备18047422号-14 </a>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.footer {
  padding: 12px 0 12px;
}
</style>
