import type { IPageModalConfig } from '@/components/page-modal/type'
import type { IPageSearchConfig } from '@/components/page-search/type'
import type { Column, IPageTableConfig } from '@/components/page-table/type'
import { DICT_TYPE } from '@/utils/dict'

export const searchConfig = ref<IPageSearchConfig>({
  formItems: [
    { label: '用户名', prop: 'username', type: 'input' },
    { label: '手机号码', prop: 'phone', type: 'input' },
    { label: '状态', prop: 'status', type: 'dict-select', dictType: DICT_TYPE.SYSTEM_COMMON_STATUS },
    { label: '创建时间', prop: 'createTime', type: 'date-picker' }
  ],
  labelCol: { style: { width: 6 + 'rem' } },
  lineItemCount: 4
})
const deptStore = useDeptStore()
const columns: Column[] = [
  { title: '用户名', dataIndex: 'username' },
  { title: '用户昵称', dataIndex: 'nickname' },
  { title: '部门', type: 'expression', expression: (record) => deptStore.getDeptName(record.deptId) },
  { title: '邮箱', dataIndex: 'email' },
  { title: '手机号码', dataIndex: 'phone' },
  { title: '状态', dataIndex: 'status', type: 'switch', checkedValue: 0, unCheckedValue: 1 },
  { title: '性别', dataIndex: 'sex', type: 'dict-tag', dictType: DICT_TYPE.SYSTEM_USER_SEX },
  { title: '备注', dataIndex: 'remark' },
  { title: '最后登陆时间', dataIndex: 'loginDate' },
  { title: '最后登陆IP', dataIndex: 'loginIp' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '操作', type: 'handle' }
]
export const tableConfig: IPageTableConfig = {
  columns,
  header: {
    title: '用户列表'
  }
}

export const modalConfig: IPageModalConfig = {
  header: { editTitle: '编辑用户', newTitle: '新增用户' },
  formItems: [
    { prop: 'id', type: 'none' },
    { prop: 'username', label: '用户名', type: 'input' },
    { prop: 'nickname', label: '用户昵称', type: 'input' },
    { prop: 'password', label: '用户密码', type: 'input', mode: 'new' },
    { prop: 'sex', label: '性别', type: 'dict-radio', dictType: DICT_TYPE.SYSTEM_USER_SEX },
    { prop: 'deptId', label: '部门', type: 'tree-select', options: deptStore.getSimpleDeptTreeList(), fieldNames: { label: 'name', value: 'id' } },
    { prop: 'phone', label: '手机号码', type: 'input' },
    { prop: 'status', label: '状态', type: 'dict-radio', dictType: DICT_TYPE.SYSTEM_COMMON_STATUS },
    { prop: 'email', label: '邮箱', type: 'input' },
    { prop: 'remark', label: '备注', type: 'input' }
  ],
  labelAlight: 'left',
  labelCol: { style: { width: 5 + 'rem' } },
  formRule: {
    username: { required: true, message: '请输入用户名', trigger: 'blur' },
    nickname: { required: true, message: '请输入用户昵称', trigger: 'blur' },
    password: [
      { required: true, message: '请输入用户密码', trigger: 'blur' },
      { message: '密码长度为 4-16 位', trigger: 'blur', max: 16, min: 4 }
    ],
    phone: { required: true, message: '请输入手机号码', trigger: 'blur' },
    status: { required: true, message: '请选择用户状态', trigger: 'blur' }
  }
}
