<script lang="ts" setup>
import { modalConfig, searchConfig, tableConfig } from './config'
import PageSearch from '@/components/page-search/page-search.vue'
import type { User, UserPageReq } from '@/types/user'
import PageModal from '@/components/page-modal/page-modal.vue'

import PageTable from '@/components/page-table/page-table.vue'

const pageSearchRef = useComponentRef(PageSearch)
const pageModalRef = useComponentRef(PageModal)

const { pageParams, dataList, loading, total, search, handleDelete, handleEdit, handleNew } = useSearchTable<UserPageReq, User>({
  pageSearchRef: pageSearchRef as Ref<InstanceType<typeof PageSearch>>,
  pageModalRef: pageModalRef as Ref<InstanceType<typeof PageModal>>,
  fetchData: getUserListApi,
  onNew: newUserApi,
  onEdit: editUserApi,
  onDelete: deleteUserApi
})

onMounted(() => {
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
  />
  <page-modal ref="pageModalRef" :modal-config="modalConfig" @edit-confirm="handleEdit" @new-confirm="handleNew" />
</template>
