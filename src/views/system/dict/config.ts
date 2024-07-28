import type { IPageModalConfig } from '@/components/page-modal/type'
import type { IPageSearchConfig } from '@/components/page-search/type'
import type { Column, IPageTableConfig } from '@/components/page-table/type'

export const searchConfig = ref<IPageSearchConfig>({
  formItems: [
    { label: '字典名称', prop: 'name', type: 'input' },
    { label: '字典类型', prop: 'type', type: 'input' },
    { label: '状态', prop: 'status', type: 'dict-select', dictType: DICT_TYPE.SYSTEM_COMMON_STATUS },
    { label: '创建时间', prop: 'createTime', type: 'date-picker' }
  ],
  labelCol: { style: { width: 6 + 'rem' } },
  lineItemCount: 4
})

const columns: Column[] = [
  { title: '字典名称', dataIndex: 'name' },
  { title: '字典类型', dataIndex: 'type' },
  { title: '状态', dataIndex: 'status', type: 'switch', checkedValue: 0, unCheckedValue: 1 },
  { title: '备注', dataIndex: 'remark' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '操作', type: 'handle' }
]
export const tableConfig: IPageTableConfig = {
  columns,
  header: {
    title: '字典列表'
  }
}

export const modalConfig: IPageModalConfig = {
  header: { editTitle: '编辑字典', newTitle: '新增字典' },
  formItems: [
    { prop: 'id', type: 'none' },
    { prop: 'name', label: '字典名称', type: 'input' },
    { prop: 'type', label: '字典类型', type: 'input' },
    { label: '状态', prop: 'status', type: 'dict-radio', dictType: DICT_TYPE.SYSTEM_COMMON_STATUS },
    { prop: 'remark', label: '备注', type: 'input' }
  ],
  labelAlight: 'left',
  labelCol: { style: { width: 5 + 'rem' } },
  formRule: {
    name: { required: true, message: '请输入字典名称', trigger: 'blur' },
    status: { required: true, message: '请选择字典类型状态', trigger: 'blur' },
    type: { required: true, message: '请输入字典类型', trigger: 'blur' }
  }
}
