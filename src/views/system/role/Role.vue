<script lang="ts" setup>
import { modalConfig, searchConfig, tableConfig } from './config'
import PageSearch from '@/components/page-search/page-search.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import PageTable from '@/components/page-table/page-table.vue'
import type { Role, RolePageReq } from '@/types/role'
import { message } from 'ant-design-vue'

const pageSearchRef = useComponentRef(PageSearch)
const pageModalRef = useComponentRef(PageModal)

const { pageParams, dataList, loading, total, search, handleDelete, handleEdit, handleNew } = useSearchTable<RolePageReq, Role>({
  pageSearchRef: pageSearchRef as Ref<InstanceType<typeof PageSearch>>,
  pageModalRef: pageModalRef as Ref<InstanceType<typeof PageModal>>,
  fetchData: getRoleListApi,
  onNew: newRoleApi,
  onEdit: editRoleApi,
  onDelete: deleteRoleApi
})
const role = ref<Role>()
const assignRoleMenuModalVisible = ref(false)
const handleAssignRoleMenu = async () => {
  await assignRolePermissionApi(role.value?.id!, roleMenuIds.value)
  assignRoleMenuModalVisible.value = false
  message.success('分配成功')
}

const roleMenuIds = ref<number[]>([])
const openAssignRoleMenuModal = async (record: Role) => {
  const { data } = await getRoleMenuListApi(record.id)
  roleMenuIds.value = data
  role.value = record
  assignRoleMenuModalVisible.value = true
}
const menuStore = useMenuStore()

onMounted(() => {
  menuStore.getSimpleMenuTreeList()
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
      <a-button size="small" type="link" @click="openAssignRoleMenuModal(record)">菜单权限</a-button>
    </template>
  </PageTable>
  <page-modal ref="pageModalRef" :modal-config="modalConfig" @edit-confirm="handleEdit" @new-confirm="handleNew" />
  <a-modal v-model:open="assignRoleMenuModalVisible" title="分配角色" @ok="handleAssignRoleMenu">
    <a-form :labelCol="{ style: { width: 5 + 'rem' } }">
      <a-form-item label="角色名称" name="name"><a-input :value="role?.name" disabled /></a-form-item>
      <a-form-item label="角色标识" name="code"> <a-input :value="role?.code" disabled /> </a-form-item>
      <a-form-item label="菜单权限" name="role">
        <a-tree v-model:checkedKeys="roleMenuIds" :tree-data="menuStore.menuSimpleTreeList" :fieldNames="{ title: 'name', key: 'id' }" checkable />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
