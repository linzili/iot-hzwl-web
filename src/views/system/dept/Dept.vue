<script lang="ts" setup>
import { modalConfig, searchConfig, tableConfig } from './config'
import PageSearch from '@/components/page-search/page-search.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import type { Dept } from '@/types/dept'
import PageTable from '@/components/page-table/page-table.vue'

const pageSearchRef = useComponentRef(PageSearch)
const pageModalRef = useComponentRef(PageModal)
const deptStore = useDeptStore()
const { pageParams, dataList, loading, total, search, handleDelete, handleEdit, handleNew } = useSearchTable<any, Dept>({
  pageSearchRef: pageSearchRef as Ref<InstanceType<typeof PageSearch>>,
  pageModalRef: pageModalRef as Ref<InstanceType<typeof PageModal>>,
  fetchData: getDeptTreeListApi,
  onNew: newDeptApi,
  onEdit: editDeptApi,
  onDelete: deleteDeptApi,
  enablePagination: false,
  afterAction: deptStore.getSimpleDeptTreeListAction
})

onMounted(() => {
  search()
})
</script>

<template>
  <page-search ref="pageSearchRef" :search-config="searchConfig" />
  <page-table
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
  </page-table>
  <page-modal ref="pageModalRef" :modal-config="modalConfig" @edit-confirm="handleEdit" @new-confirm="handleNew" />
</template>
