import type { SimpleTenantPackage } from '@/types/tenant'

export const useTenantStore = defineStore('tenant', () => {
  const tenantPackageSimpleList = ref<SimpleTenantPackage[]>([])

  const getSimpleTenantPackageListAction = async () => {
    const { data } = await getSimpleTenantPackageListApi()
    tenantPackageSimpleList.value = data
    tenantPackageSimpleList.value.push({ id: '0', name: '系统租户' })
  }

  return {
    tenantPackageSimpleList,
    getSimpleTenantPackageListAction
  }
})
