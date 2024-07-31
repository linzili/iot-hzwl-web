import type { IPageModalConfig } from '@/components/page-modal/type'
import type { IPageSearchConfig } from '@/components/page-search/type'
import type { Column, IPageTableConfig } from '@/components/page-table/type'
import { DICT_TYPE } from '@/utils/dict'

export const searchConfig = ref<IPageSearchConfig>({
  formItems: [
    { label: '名称', prop: 'name', type: 'input' },
    { label: '标识', prop: 'code', type: 'input' },
    { label: '状态', prop: 'status', type: 'dict-select', dictType: DICT_TYPE.SYSTEM_COMMON_STATUS },
    { label: '创建时间', prop: 'createTime', type: 'date-picker' }
  ],
  labelCol: { style: { width: 6 + 'rem' } },
  lineItemCount: 4
})

const columns: Column[] = [
  { title: '名称', dataIndex: 'name' },
  { title: '标识', dataIndex: 'code' },
  { title: '排序', dataIndex: 'sort' },
  { title: '状态', dataIndex: 'status', type: 'switch', checkedValue: 0, unCheckedValue: 1 },
  { title: '类型', dataIndex: 'type', type: 'dict-tag', dictType: DICT_TYPE.SYSTEM_ROLE_TYPE },
  { title: '备注', dataIndex: 'remark' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '操作', type: 'handle' }
]
export const tableConfig: IPageTableConfig = {
  columns,
  header: {
    title: '角色列表'
  }
}

export const modalConfig = ref<IPageModalConfig>({
  header: { editTitle: '编辑角色', newTitle: '新增角色' },
  formItems: [
    { prop: 'id', type: 'none' },
    { prop: 'name', label: '名称', type: 'input' },
    { prop: 'code', label: '标识', type: 'input' },
    { prop: 'sort', label: '排序', type: 'input-number' },
    { prop: 'remark', label: '备注', type: 'input' }
  ],
  labelAlight: 'left',
  labelCol: { style: { width: 5 + 'rem' } },
  formRule: {
    name: { required: true, message: '请输入角色标识', trigger: 'blur' },
    code: { required: true, message: '请输入角色标识', trigger: 'blur' },
    sort: { required: true, message: '请输入排序', trigger: 'blur' }
  }
})
