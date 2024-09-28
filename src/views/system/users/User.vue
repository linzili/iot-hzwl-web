<script lang="ts" setup>
import { modalConfig, searchConfig, tableConfig } from './config'
import PageSearch from '@/components/page-search/page-search.vue'
import type { User, UserPageReq } from '@/types/user'
import PageModal from '@/components/page-modal/page-modal.vue'

import PageTable from '@/components/page-table/page-table.vue'
import type { PermissionAssignUserRoleReq } from '@/types/permission'
import { message } from 'ant-design-vue'

const pageSearchRef = useComponentRef(PageSearch)
const pageModalRef = useComponentRef(PageModal)
const userStore = useUserStore()
const { pageParams, dataList, loading, total, search, handleDelete, handleEdit, handleNew } = useSearchTable<UserPageReq, User>({
  pageSearchRef: pageSearchRef as Ref<InstanceType<typeof PageSearch>>,
  pageModalRef: pageModalRef as Ref<InstanceType<typeof PageModal>>,
  fetchData: getUserListApi,
  onNew: newUserApi,
  onEdit: editUserApi,
  onDelete: deleteUserApi,
  afterAction: userStore.getUserSimpleListAction
})

const assignUserRoleModalVisible = ref(false)
const user = ref<User>()

// 打开分配角色modal
const openAssignUserRoleModal = async (_user: User) => {
  assignUserRoleModalVisible.value = true
  user.value = _user
  assignUserRoleModel.userId = _user.id
  const { data } = await getSimpleRoleListByUserIdApi(_user.id)
  assignUserRoleModel.roleIds = data.map((item) => item.id)
}
// 分配角色给用户的模型
const assignUserRoleModel = reactive<PermissionAssignUserRoleReq>({
  userId: undefined,
  roleIds: []
})

const roleStore = useRoleStore()
const { roleSimpleList } = toRefs(roleStore)

const handleAssignUserRole = async () => {
  const { data } = await assignUserRoleApi(assignUserRoleModel)
  if (data) {
    message.success('分配成功')
    assignUserRoleModalVisible.value = false
  }
}

onMounted(() => {
  roleStore.getSimpleRoleListAction()
  search()
})
</script>

<template>
  <page-search ref="pageSearchRef" :search-config="searchConfig" />

  <PageTable
    v-model:pageParams="pageParams"
    :data-list
    :loading
    :table-config="tableConfig"
    :total
    @delete="handleDelete"
    @edit="handleEdit"
    @on-create="pageModalRef?.open()"
    @on-edit="(record) => pageModalRef?.open('edit', record)"
  >
    <template #handle-before="record">
      <a-button size="small" type="link" @click="openAssignUserRoleModal(record)">分配角色</a-button>
    </template>
  </PageTable>
  <page-modal ref="pageModalRef" :modal-config="modalConfig" @edit-confirm="handleEdit" @new-confirm="handleNew" />
  <a-modal v-model:open="assignUserRoleModalVisible" title="分配角色" @ok="handleAssignUserRole">
    <a-form :labelCol="{ style: { width: 5 + 'rem' } }">
      <a-form-item label="用户名称" name="username"><a-input :value="user?.username" disabled /></a-form-item>
      <a-form-item label="用户昵称" name="nickname"> <a-input :value="user?.nickname" disabled /> </a-form-item>
      <a-form-item label="角色" name="role">
        <a-select
          v-model:value="assignUserRoleModel.roleIds"
          mode="multiple"
          placeholder="请选择角色"
          style="width: 100%"
          :options="roleSimpleList?.map((item) => ({ label: item.name, value: item.id }))"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
