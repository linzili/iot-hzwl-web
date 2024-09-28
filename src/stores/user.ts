import type { UserSimpleRespVO } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const userSimpleList = ref<UserSimpleRespVO[]>([])

  async function getUserSimpleListAction() {
    const { data } = await getUserSimpleListApi()
    userSimpleList.value = data
  }

  function getUserSimpleList() {
    if (userSimpleList.value === undefined || userSimpleList.value.length === 0) {
      getUserSimpleListAction()
    }
    return userSimpleList
  }

  return {
    userSimpleList,
    getUserSimpleListAction,
    getUserSimpleList
  }
})
