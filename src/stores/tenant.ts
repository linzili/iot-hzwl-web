import type { SimpleTenantPackage } from '@/types/tenant'

export const useTenantStore = defineStore('tenant', () => {
  const tenantPackageSimpleList = ref<SimpleTenantPackage[]>([])

  const getSimpleTenantPackageListAction = async () => {
    const { data } = await getSimpleTenantPackageListApi()
    tenantPackageSimpleList.value = data
  }

  return {
    tenantPackageSimpleList,
    getSimpleTenantPackageListAction
  }
})
