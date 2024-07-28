import type { IPageModalConfig } from '@/components/page-modal/type'
import type { IPageSearchConfig } from '@/components/page-search/type'
import type { Column, IPageTableConfig } from '@/components/page-table/type'
import { CommonStatusOptions } from '@/constants/options'

const dictStore = useDictStore()
const { simpleDictTypeList } = toRefs(dictStore)

export const searchConfig = ref<IPageSearchConfig>({
  formItems: [
    { label: '字典类型', prop: 'dictType', type: 'select', options: simpleDictTypeList, fieldNames: { label: 'name', value: 'type' } },
    { label: '字典标签', prop: 'label', type: 'input' },
    { label: '状态', prop: 'status', type: 'dict-select', dictType: DICT_TYPE.SYSTEM_COMMON_STATUS }
  ],
  labelCol: { style: { width: 6 + 'rem' } },
  lineItemCount: 3
})

const columns: Column[] = [
  { title: '字典标签', dataIndex: 'label' },
  { title: '字典键值', dataIndex: 'value' },
  { title: '字典排序', dataIndex: 'sort' },
  { title: '状态', dataIndex: 'status', type: 'switch', checkedValue: 0, unCheckedValue: 1 },
  {
    title: '颜色类型',
    dataIndex: 'colorType',
    type: 'expression',
    expression: (value) => ColorTypeOption.find((option) => value.colorType === option.value)?.label
  },
  { title: 'CSS Class', dataIndex: 'cssClass' },
  { title: '备注', dataIndex: 'remark' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '操作', type: 'handle' }
]
export const tableConfig: IPageTableConfig = {
  columns,
  header: {
    title: '字典数据'
  }
}

export const modalConfig = ref<IPageModalConfig>({
  header: { editTitle: '编辑字典数据', newTitle: '新增字典数据' },
  formItems: [
    { prop: 'id', type: 'none' },
    { prop: 'dictType', label: '字典类型', type: 'select', options: simpleDictTypeList, fieldNames: { label: 'name', value: 'type' } },
    { prop: 'label', label: '字典标签', type: 'input' },
    { prop: 'value', label: '字典键值', type: 'input-number' },
    { prop: 'sort', label: '显示排序', type: 'input-number' },
    { prop: 'status', label: '状态', type: 'radio', options: CommonStatusOptions },
    { prop: 'colorType', label: '颜色类型', type: 'select', options: ColorTypeOption },
    { prop: 'cssClass', label: 'CSS Class', type: 'input' },
    { prop: 'remark', label: '备注', type: 'input' }
  ],
  labelAlight: 'left',
  labelCol: { style: { width: 5 + 'rem' } },
  formRule: {
    dictType: [{ required: true, message: '请选择字典类型', trigger: 'blur' }],
    label: [{ required: true, message: '清输入字典标签', trigger: 'blur' }],
    value: [{ required: true, message: '请输入字典键值', trigger: 'blur' }],
    sort: [{ required: true, message: '请输入显示排序', trigger: 'blur' }],
    status: [{ required: true, message: '请选择字典状态', trigger: 'blur' }]
  }
})
