<script lang="ts" setup>
import { MenuType, modalConfig, searchConfig, tableConfig } from './config'
import PageSearch from '@/components/page-search/page-search.vue'

import PageModal from '@/components/page-modal/page-modal.vue'

import PageTable from '@/components/page-table/page-table.vue'
import type { Menu } from '@/types/menu'

const pageSearchRef = useComponentRef(PageSearch)
const pageModalRef = useComponentRef(PageModal)

const { pageParams, dataList, loading, total, search, handleDelete, handleEdit, handleNew } = useSearchTable<any, Menu>({
  pageSearchRef: pageSearchRef as Ref<InstanceType<typeof PageSearch>>,
  pageModalRef: pageModalRef as Ref<InstanceType<typeof PageModal>>,
  fetchData: getMenuTreeListApi,
  onNew: newMenuApi,
  onEdit: editMenuApi,
  onDelete: deleteMenuApi,
  enablePagination: false
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
  <page-modal ref="pageModalRef" :modal-config="modalConfig" @edit-confirm="handleEdit" @new-confirm="handleNew">
    <template #icon="{ formData, item }">
      <a-form-item v-if="formData.type === MenuType.DIR || formData.type === MenuType.MENU" :label="item.label" :name="item.prop">
        <a-input v-model:value="formData[item.prop]" />
      </a-form-item>
    </template>
    <template #path="{ formData, item }">
      <a-form-item v-if="formData.type === MenuType.DIR || formData.type === MenuType.MENU" :label="item.label" :name="item.prop">
        <a-input v-model:value="formData[item.prop]" />
      </a-form-item>
    </template>
    <template #component="{ formData, item }">
      <a-form-item v-if="formData.type === MenuType.MENU" :label="item.label" :name="item.prop">
        <a-input v-model:value="formData[item.prop]" />
      </a-form-item>
    </template>
    <template #componentName="{ formData, item }">
      <a-form-item v-if="formData.type === MenuType.MENU" :label="item.label" :name="item.prop">
        <a-input v-model:value="formData[item.prop]" />
      </a-form-item>
    </template>
    <template #permission="{ formData, item }">
      <a-form-item v-if="formData.type === MenuType.BUTTON || formData.type === MenuType.MENU" :label="item.label" :name="item.prop">
        <a-input v-model:value="formData[item.prop]" />
      </a-form-item>
    </template>
    <template #visible="{ formData, item }">
      <a-form-item v-if="formData.type === MenuType.DIR || formData.type === MenuType.MENU" :label="item.label" :name="item.prop">
        <a-radio-group v-model:value="formData[item.prop]">
          <a-radio v-for="radio in item.options" :key="radio[item.fieldNames?.value || 'value']" :value="radio[item.fieldNames?.value || 'value']">
            {{ radio[item.fieldNames?.label || 'label'] }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
    </template>
    <template #keepAlive="{ formData, item }">
      <a-form-item v-if="formData.type === MenuType.MENU" :label="item.label" :name="item.prop">
        <a-radio-group v-model:value="formData[item.prop]">
          <a-radio v-for="radio in item.options" :key="radio[item.fieldNames?.value || 'value']" :value="radio[item.fieldNames?.value || 'value']">
            {{ radio[item.fieldNames?.label || 'label'] }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
    </template>
  </page-modal>
</template>
