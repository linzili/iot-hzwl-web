<script lang="ts" setup>
import { modalConfig, searchConfig, tableConfig } from './config'
import PageSearch from '@/components/page-search/page-search.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import type { Dict, DictPageReq } from '@/types/dict'
import PageTable from '@/components/page-table/page-table.vue'

const pageSearchRef = useComponentRef(PageSearch)
const pageModalRef = useComponentRef(PageModal)
const dictStore = useDictStore()
const { pageParams, dataList, loading, total, search, handleDelete, handleEdit, handleNew } = useSearchTable<DictPageReq, Dict>({
  pageSearchRef: pageSearchRef as Ref<InstanceType<typeof PageSearch>>,
  pageModalRef: pageModalRef as Ref<InstanceType<typeof PageModal>>,
  fetchData: getDictListApi,
  onNew: newDictApi,
  onEdit: editDictApi,
  onDelete: deleteDictApi,
  afterAction: dictStore.getSimpleDictListAction
})

onMounted(() => {
  search()
})
</script>

<template>
  <DictTag type="sys_user_sex" value="2" />

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
    <template #handle-before="record">
      <a-button size="small" type="link" @click="$router.push({ name: 'DictData', params: { dictType: record.type } })">数据</a-button>
    </template>
  </page-table>
  <page-modal ref="pageModalRef" :modal-config="modalConfig" @edit-confirm="handleEdit" @new-confirm="handleNew" />
</template>
