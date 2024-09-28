import type { IPageModalConfig } from '@/components/page-modal/type'
import type { IPageSearchConfig } from '@/components/page-search/type'
import type { Column, IPageTableConfig } from '@/components/page-table/type'
import { CommonStatusOptions } from '@/constants/options'

export const searchConfig = ref<IPageSearchConfig>({
  formItems: [
    { label: '套餐名称', prop: 'name', type: 'input' },
    {
      label: '状态',
      prop: 'status',
      type: 'select',
      options: CommonStatusOptions
    },
    { label: '创建时间', prop: 'createTime', type: 'date-picker' }
  ],
  labelCol: { style: { width: 6 + 'rem' } },
  lineItemCount: 3
})

const columns: Column[] = [
  { title: '套餐名称', dataIndex: 'name' },
  { title: '套餐状态', dataIndex: 'status', type: 'switch', checkedValue: 0, unCheckedValue: 1 },
  { title: '备注', dataIndex: 'remark' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '操作', type: 'handle' }
]
export const tableConfig: IPageTableConfig = {
  columns,
  header: {
    title: '租户列表'
  }
}

export const modalConfig: IPageModalConfig = {
  header: { editTitle: '编辑租户套餐', newTitle: '新增租户套餐' },
  formItems: [
    { prop: 'id', type: 'none' },
    { prop: 'name', label: '套餐名称', type: 'input' },
    { prop: 'menuIds', label: '菜单权限', type: 'slot', slotName: 'menu' },
    { prop: 'status', label: '状态', type: 'dict-radio', dictType: DICT_TYPE.SYSTEM_COMMON_STATUS },
    { prop: 'remark', label: '备注', type: 'input' }
  ],
  labelAlight: 'left',
  labelCol: { style: { width: 5 + 'rem' } },
  formRule: {
    name: [{ required: true, message: '请输入套餐名称', trigger: 'blur' }],
    status: [{ required: true, message: '请选择套餐状态', trigger: 'blur' }]
  }
}
