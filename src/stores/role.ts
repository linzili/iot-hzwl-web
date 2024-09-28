import type { SimpleRole } from '@/types/role'

export const useRoleStore = defineStore('role', () => {
  const roleSimpleList = ref<SimpleRole[]>()

  const getSimpleRoleListAction = async () => {
    const { data } = await getSimpleRoleListApi()
    roleSimpleList.value = data
  }

  return {
    roleSimpleList,
    getSimpleRoleListAction
  }
})
