import type { IPageModalConfig } from '@/components/page-modal/type'
import type { IPageSearchConfig } from '@/components/page-search/type'
import type { Column, IPageTableConfig } from '@/components/page-table/type'
import { CommonStatusOptions } from '@/constants/options'
import { DICT_TYPE } from '@/utils/dict'

export const searchConfig = ref<IPageSearchConfig>({
  formItems: [
    { label: '菜单名称', prop: 'name', type: 'input' },
    { label: '状态', prop: 'status', type: 'dict-select', dictType: DICT_TYPE.SYSTEM_COMMON_STATUS }
  ],
  labelCol: { style: { width: 6 + 'rem' } },
  lineItemCount: 3
})

const columns: Column[] = [
  { title: '菜单名称', dataIndex: 'name' },
  { title: '图标', dataIndex: 'icon' },
  { title: '排序', dataIndex: 'sort' },
  { title: '权限标识', dataIndex: 'permission' },
  { title: '组件路径', dataIndex: 'component' },
  { title: '组件名称', dataIndex: 'componentName' },
  { title: '状态', dataIndex: 'status', type: 'switch', checkedValue: 0, unCheckedValue: 1 },
  { title: '操作', type: 'handle' }
]
export const tableConfig: IPageTableConfig = {
  columns,
  rowKey: 'id',
  showPagination: false,
  size: 'small',
  header: {
    title: '菜单列表'
  }
}
export const MenuType = {
  DIR: 1,
  MENU: 2,
  BUTTON: 3
}
const menuTypeOptions = [
  { label: '目录', value: 1 },
  { label: '菜单', value: 2 },
  { label: '按钮', value: 3 }
]
const menuStore = useMenuStore()
export const modalConfig: IPageModalConfig = {
  header: { editTitle: '编辑菜单', newTitle: '新增菜单' },
  formItems: [
    { prop: 'id', type: 'none' },
    {
      prop: 'parentId',
      label: '上级菜单',
      type: 'tree-select',
      options: ref([{ id: 0, name: '顶级菜单', children: [menuStore.getSimpleMenuTreeList()] }]),
      fieldNames: { label: 'name', value: 'id' }
    },
    { prop: 'name', label: '菜单名称', type: 'input' },
    { prop: 'type', label: '菜单类型', type: 'radio', options: menuTypeOptions, initialValue: 1 },
    { prop: 'icon', label: '菜单图标', type: 'slot', slotName: 'icon' },
    { prop: 'path', label: '路由地址', type: 'slot', slotName: 'path' },
    { prop: 'component', label: '组件地址', type: 'slot', slotName: 'component' },
    { prop: 'componentName', label: '组件名称', type: 'slot', slotName: 'componentName' },
    { prop: 'permission', label: '权限标识', type: 'slot', slotName: 'permission' },
    { prop: 'sort', label: '显示排序', type: 'input-number' },
    { prop: 'status', label: '菜单状态', type: 'radio', options: CommonStatusOptions },
    {
      prop: 'visible',
      label: '显示状态',
      type: 'slot',
      slotName: 'visible',
      options: [
        { label: '显示', value: true },
        { label: '隐藏', value: false }
      ]
    },
    {
      prop: 'keepAlive',
      label: '缓存状态',
      type: 'slot',
      slotName: 'keepAlive',
      options: [
        { label: '缓存', value: true },
        { label: '不缓存', value: false }
      ]
    }
  ],
  labelAlight: 'left',
  labelCol: { style: { width: 5 + 'rem' } },
  formRule: {
    name: { required: true, message: '请输入菜单名称', trigger: 'blur' },
    type: { required: true, message: '请选择菜单类型', trigger: 'blur' },
    path: { required: true, message: '请输入路由地址', trigger: 'blur' },
    sort: { required: true, message: '请输入显示排序', trigger: 'blur' },
    status: { required: true, message: '请选择菜单状态', trigger: 'blur' }
  }
}
