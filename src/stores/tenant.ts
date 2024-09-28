import type { SimpleTenant, SimpleTenantPackage } from '@/types/tenant'

export const useTenantStore = defineStore('tenant', () => {
  const tenantInfo = ref<SimpleTenant>()
  const tenantPackageSimpleList = ref<SimpleTenantPackage[]>([])

  const getSimpleTenantPackageListAction = async () => {
    const { data } = await getSimpleTenantPackageListApi()
    tenantPackageSimpleList.value = data
    tenantPackageSimpleList.value.push({ id: '0', name: '系统租户' })
  }

  const getTenantByWebsiteAction = async (website: string) => {
    const { data } = await getSimpleTenantByWebsite({ website })
    tenantInfo.value = data
  }

  return {
    tenantPackageSimpleList,
    tenantInfo,
    getSimpleTenantPackageListAction,
    getTenantByWebsiteAction
  }
})
