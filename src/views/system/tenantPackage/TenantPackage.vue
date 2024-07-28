<script lang="ts" setup>
import { modalConfig, searchConfig, tableConfig } from './config'
import PageSearch from '@/components/page-search/page-search.vue'
import type { TenantPackage, TenantPackagePageReq } from '@/types/tenant'
import PageModal from '@/components/page-modal/page-modal.vue'

const pageSearchRef = useComponentRef(PageSearch)
const pageModalRef = useComponentRef(PageModal)

const { pageParams, dataList, loading, total, search, handleDelete, handleEdit, handleNew } = useSearchTable<TenantPackagePageReq, TenantPackage>({
  pageSearchRef: pageSearchRef as Ref<InstanceType<typeof PageSearch>>,
  pageModalRef: pageModalRef as Ref<InstanceType<typeof PageModal>>,
  fetchData: getTenantPackageListApi,
  onNew: newTenantPackageApi,
  onEdit: editTenantPackageApi,
  onDelete: deleteTenantPackageApi
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
  />
  <page-modal ref="pageModalRef" :modal-config="modalConfig" @edit-confirm="handleEdit" @new-confirm="handleNew" />
</template>
