<script lang="ts" setup>
import { modalConfig, searchConfig, tableConfig } from './config'
import PageSearch from '@/components/page-search/page-search.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import type { DictData, DictDataPageReq } from '@/types/dict'
import PageTable from '@/components/page-table/page-table.vue'

const props = defineProps<{
  dictType: string
}>()

const dictTypeItem = searchConfig.value.formItems.find((item) => item.prop === 'dictType')
if (dictTypeItem) {
  dictTypeItem.defaultValue = props.dictType
}

const pageSearchRef = useComponentRef(PageSearch)
const pageModalRef = useComponentRef(PageModal)

const getDictDataList = async (params: DictDataPageReq) => {
  if (params.dictType === undefined) {
    params.dictType = props.dictType
  }
  const dictTypeItem = modalConfig.value.formItems.find((item) => item.prop === 'dictType')
  if (dictTypeItem) {
    dictTypeItem.initialValue = params.dictType
  }
  return await getDictDataListApi(params)
}

const { pageParams, dataList, loading, total, search, handleDelete, handleEdit, handleNew } = useSearchTable<DictDataPageReq, DictData>({
  pageSearchRef: pageSearchRef as Ref<InstanceType<typeof PageSearch>>,
  pageModalRef: pageModalRef as Ref<InstanceType<typeof PageModal>>,
  fetchData: getDictDataList,
  onNew: newDictDataApi,
  onEdit: editDictDataApi,
  onDelete: deleteDictDataApi
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
