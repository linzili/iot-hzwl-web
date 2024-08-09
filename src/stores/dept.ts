import type { SimpleDept, SimpleDeptTree } from '@/types/dept'

export const useDeptStore = defineStore('dept', () => {
  const deptSimpleTreeList = ref<SimpleDeptTree[]>([{ id: 0, name: '顶级部门', children: [] }])
  const deptSimpleList = ref<SimpleDept[]>([])

  const getSimpleDeptTreeListAction = async () => {
    const { data } = await getSimpleDeptTreeListApi()
    deptSimpleTreeList.value[0].children = data
  }

  const getSimpleDeptListAction = async () => {
    const { data } = await getSimpleDeptListApi()
    deptSimpleList.value = data
  }

  function getSimpleDeptTreeList() {
    if (deptSimpleTreeList.value[0].children?.length === 0) {
      getSimpleDeptTreeListAction()
    }
    return deptSimpleTreeList
  }

  function getSimpleDeptList() {
    if (deptSimpleList.value.length === 0) {
      getSimpleDeptListAction()
    }
    return deptSimpleList
  }
  function getDeptName(deptId: number) {
    return getSimpleDeptList().value.find((item) => item.id === deptId)?.name
  }
  return {
    deptSimpleTreeList,
    getSimpleDeptTreeList,
    getSimpleDeptTreeListAction,
    getSimpleDeptListAction,
    getDeptName
  }
})
