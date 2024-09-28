import type { SimpleMenuTree } from '@/types/menu'

export const useMenuStore = defineStore('menu', () => {
  const menuSimpleTreeList = ref<SimpleMenuTree[]>([])

  const getSimpleMenuTreeListAction = async () => {
    const { data } = await getSimpleMenuTreeListApi()
    menuSimpleTreeList.value = data
  }

  function getSimpleMenuTreeList() {
    if (menuSimpleTreeList.value.length === 0) {
      getSimpleMenuTreeListAction()
    }
    return menuSimpleTreeList
  }

  return {
    menuSimpleTreeList,
    getSimpleMenuTreeList,
    getSimpleMenuTreeListAction
  }
})
