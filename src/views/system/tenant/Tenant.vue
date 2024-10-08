<script lang="ts" setup>
import { modalConfig, searchConfig, tableConfig } from './config'
import PageSearch from '@/components/page-search/page-search.vue'
import type { Tenant, TenantPageReq } from '@/types/tenant'
import PageModal from '@/components/page-modal/page-modal.vue'
import PageTable from '@/components/page-table/page-table.vue'

const pageSearchRef = useComponentRef(PageSearch)
const pageModalRef = useComponentRef(PageModal)

const { pageParams, dataList, loading, total, search, handleDelete, handleEdit, handleNew } = useSearchTable<TenantPageReq, Tenant>({
  pageSearchRef: pageSearchRef as Ref<InstanceType<typeof PageSearch>>,
  pageModalRef: pageModalRef as Ref<InstanceType<typeof PageModal>>,
  fetchData: getTenantListApi,
  onNew: newTenantApi,
  onEdit: editTenantApi,
  onDelete: deleteTenantApi
})
const tenantStore = useTenantStore()
onMounted(() => {
  search()
  tenantStore.getSimpleTenantPackageListAction()
})

const { tenantPackageSimpleList } = toRefs(tenantStore)
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
    <template #packageName="{ record }: { record: Tenant }">
      <a-tag :color="record.packageId === '0' ? 'error' : 'processing'">{{
        tenantPackageSimpleList.find((it) => it.id === record.packageId)?.name
      }}</a-tag>
    </template>
  </PageTable>
  <page-modal ref="pageModalRef" :modal-config="modalConfig" @edit-confirm="handleEdit" @new-confirm="handleNew" />
</template>
