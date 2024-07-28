<script lang="ts" setup>
import type { Route } from 'ant-design-vue/es/breadcrumb/Breadcrumb'

const route = useRoute()
const router = useRouter()

const breadcrumbRoutes = computed<Route[]>(() => {
  let matchedRoutes = route.matched.slice(1)
  if (route.meta.activeMenu) {
    const activeRoute = router.resolve({ name: route.meta.activeMenu as string })
    matchedRoutes = activeRoute.matched.slice(1)
    matchedRoutes.push(...route.matched.slice(-1))
  }
  return matchedRoutes.map((route) => ({
    breadcrumbName: route.meta?.title as string,
    path: route.path
  }))
})
</script>

<template>
  <a-breadcrumb :routes="breadcrumbRoutes" class="mb-2 ml-2">
    <template #itemRender="{ route, paths }">
      <span v-if="breadcrumbRoutes.indexOf(route) === breadcrumbRoutes.length - 1">
        {{ route.breadcrumbName }}
      </span>
      <router-link v-else :to="`/${paths[paths.length - 1]}`">
        {{ route.breadcrumbName }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>
