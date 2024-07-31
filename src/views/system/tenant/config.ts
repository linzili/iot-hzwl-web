import type { IPageModalConfig } from '@/components/page-modal/type'
import type { IPageSearchConfig } from '@/components/page-search/type'
import type { Column, IPageTableConfig } from '@/components/page-table/type'

const tenantStore = useTenantStore()
const { tenantPackageSimpleList } = toRefs(tenantStore)
export const searchConfig = ref<IPageSearchConfig>({
  formItems: [
    { label: '租户名称', prop: 'name', type: 'input' },
    { label: '联系人', prop: 'contactName', type: 'input' },
    { label: '状态', prop: 'status', type: 'dict-select', dictType: DICT_TYPE.SYSTEM_COMMON_STATUS },
    { label: '绑定域名', prop: 'website', type: 'input' },
    { label: '租户套餐', prop: 'packageId', type: 'select', fieldNames: { label: 'name', value: 'id' }, options: tenantPackageSimpleList },
    { label: '创建时间', prop: 'createTime', type: 'date-picker' }
  ],
  labelCol: { style: { width: 6 + 'rem' } },
  lineItemCount: 3
})

const columns: Column[] = [
  { title: '租户名称', dataIndex: 'name' },
  {
    title: '租户套餐',
    dataIndex: 'packageId',
    type: 'slot',
    slotName: 'packageName'
  },
  { title: '联系人', dataIndex: 'contactName' },
  { title: '联系电话', dataIndex: 'contactPhone' },
  { title: '账号额度', dataIndex: 'accountCount', type: 'tag', color: 'primary' },
  { title: '过期时间', dataIndex: 'expireTime' },
  { title: '绑定域名', dataIndex: 'website' },
  { title: '租户状态', dataIndex: 'status', type: 'switch', checkedValue: 0, unCheckedValue: 1 },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '操作', type: 'handle' }
]
export const tableConfig: IPageTableConfig = {
  columns,
  header: {
    title: '租户列表'
  }
}

export const modalConfig = ref<IPageModalConfig>({
  header: { editTitle: '编辑租户', newTitle: '新增租户' },
  formItems: [
    { prop: 'id', type: 'none' },
    { prop: 'name', label: '租户名称', type: 'input' },
    { prop: 'packageId', label: '套餐', type: 'select', fieldNames: { label: 'name', value: 'id' }, options: tenantPackageSimpleList },
    { prop: 'contactName', label: '联系人', type: 'input' },
    { prop: 'contactPhone', label: '联系电话', type: 'input' },
    { prop: 'username', label: '用户名', type: 'input', mode: 'new' },
    { prop: 'password', label: '用户密码', type: 'input', mode: 'new' },
    { prop: 'accountCount', label: '账号额度', type: 'input-number' },
    { prop: 'expireTime', label: '过期时间', type: 'date-picker' },
    { prop: 'website', label: '绑定域名', type: 'input' },
    { label: '状态', prop: 'status', type: 'dict-radio', dictType: DICT_TYPE.SYSTEM_COMMON_STATUS }
  ],
  labelAlight: 'left',
  labelCol: { style: { width: 5 + 'rem' } },
  formRule: {
    name: { required: true, message: '请输入租户名称', trigger: 'blur' },
    contactName: { required: true, message: '请输入联系人姓名', trigger: 'blur' },
    contactPhone: { required: true, message: '请输入联系电话', trigger: 'blur' },
    username: { required: true, message: '请输入用户名', trigger: 'blur' },
    password: { required: true, message: '请输入用户密码', trigger: 'blur' },
    website: { required: true, message: '请输入租户域名', trigger: 'blur' },
    accountCount: { required: true, message: '请输入账号额度', trigger: 'blur' },
    expireTime: { required: true, message: '请选择过期时间', trigger: 'blur' },
    packageId: { required: true, message: '请选择租户套餐', trigger: 'blur' },
    status: { required: true, message: '请选择租户状态', trigger: 'blur' }
  }
})
