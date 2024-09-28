import type { IPageModalConfig } from '@/components/page-modal/type'
import type { IPageSearchConfig } from '@/components/page-search/type'
import type { Column, IPageTableConfig } from '@/components/page-table/type'

export const searchConfig = ref<IPageSearchConfig>({
  formItems: [
    { label: '名称', prop: 'name', type: 'input' },
    { label: '状态', prop: 'status', type: 'dict-select', dictType: DICT_TYPE.SYSTEM_COMMON_STATUS }
  ],
  labelCol: { style: { width: 6 + 'rem' } },
  lineItemCount: 3
})

const columns: Column[] = [
  { title: '名称', dataIndex: 'name' },
  { title: '排序', dataIndex: 'sort' },
  { title: '负责人', type: 'expression', expression: (record) => userStore.userSimpleList.find((item) => item.id === record.leaderUserId)?.nickname },
  { title: '邮箱', dataIndex: 'email' },
  { title: '电话', dataIndex: 'phone' },
  { title: '状态', dataIndex: 'status', type: 'switch', checkedValue: 0, unCheckedValue: 1 },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '操作', type: 'handle' }
]
export const tableConfig: IPageTableConfig = {
  columns,
  header: {
    title: '部门列表'
  },
  rowKey: 'id'
}
const deptStore = useDeptStore()
const userStore = useUserStore()
export const modalConfig = ref<IPageModalConfig>({
  header: { editTitle: '编辑部门', newTitle: '新增部门' },
  formItems: [
    { prop: 'id', type: 'none' },
    {
      prop: 'parentId',
      label: '上级部门',
      type: 'tree-select',
      options: deptStore.getSimpleDeptTreeList(),
      fieldNames: { label: 'name', value: 'id' }
    },
    { prop: 'name', label: '部门名称', type: 'input' },
    { prop: 'sort', label: '显示排序', type: 'input-number' },
    { prop: 'phone', label: '联系电话', type: 'input' },
    {
      prop: 'leaderUserId',
      label: '部门负责人',
      type: 'select',
      options: userStore.getUserSimpleList(),
      fieldNames: { label: 'nickname', value: 'id' }
    },
    { prop: 'email', label: '邮箱', type: 'input' },
    { label: '状态', prop: 'status', type: 'dict-radio', dictType: DICT_TYPE.SYSTEM_COMMON_STATUS }
  ],
  labelAlight: 'left',
  labelCol: { style: { width: 5 + 'rem' } },
  formRule: {
    name: { required: true, message: '请输入部门名称', trigger: 'blur' },
    status: { required: true, message: '请选择部门状态', trigger: 'blur' },
    sort: { required: true, message: '请输入显示排序', trigger: 'blur' }
  }
})
