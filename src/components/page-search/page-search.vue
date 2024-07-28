<script lang="ts" setup>
import type { FormInstance } from 'ant-design-vue'
import type { IPageSearchProps } from './type'
import type { DefaultOptionType } from 'ant-design-vue/es/select'
import { getDictOptions } from '@/utils/dict'

const props = defineProps<IPageSearchProps>()

const emit = defineEmits(['search', 'reset'])
const searchForm = ref<Record<string, any>>({})

for (const item of props.searchConfig.formItems) {
  searchForm.value[item.prop] = item.defaultValue || undefined
}

const formRef = ref<FormInstance>()
const search = ref<(value?: any) => {}>()

function setSearch(val: () => {}) {
  search.value = val
}

function handleSearch() {
  if (search.value !== undefined) {
    search.value(searchForm.value)
  }
  emit('search', searchForm.value)
}

function handleReset() {
  formRef.value?.resetFields()
  if (search.value !== undefined) {
    search.value(formRef.value)
  }
  emit('reset')
}

defineExpose({
  handleSearch,
  setSearch
})

const expand = ref(false)
</script>

<template>
  <a-card class="mb-4">
    <a-form ref="formRef" :label-col="searchConfig?.labelCol || { style: { width: '6rem' } }" :model="searchForm">
      <a-row :gutter="24">
        <template v-for="item in searchConfig.formItems" :key="item.label">
          <a-col
            v-show="item.defaultHide !== true || expand"
            :flex="searchConfig?.lineItemCount ? `${100 / searchConfig?.lineItemCount}%` : '33.33%'"
          >
            <a-form-item :label="item.label" :name="item.prop">
              <a-input v-if="item.type === 'input'" v-model:value="searchForm[item.prop]" allow-clear />
              <a-select
                v-else-if="item.type === 'select'"
                v-model:value="searchForm[item.prop]"
                :fieldNames="{ label: item.fieldNames?.label || 'label', value: item.fieldNames?.value || 'value' }"
                :options="item.options as DefaultOptionType[]"
                allow-clear
              />
              <a-select
                v-else-if="item.type === 'dict-select'"
                v-model:value="searchForm[item.prop]"
                :options="getDictOptions(item.dictType) as DefaultOptionType[]"
                allow-clear
              />
              <a-range-picker
                v-else-if="item.type === 'date-picker'"
                v-model:value="searchForm[item.prop]"
                class="w-full"
                valueFormat="YYYY-MM-DD HH:mm:ss"
              />
            </a-form-item>
          </a-col>
        </template>
      </a-row>

      <div class="text-right">
        <a-space>
          <a-button @click="handleReset">重置</a-button>
          <a-button type="primary" @click="handleSearch">查询</a-button>
          <a-button v-if="searchConfig.formItems.some((item) => item.defaultHide === true)" type="link" @click="expand = !expand">
            <template v-if="expand"> <UpOutlined />折叠 </template>
            <template v-else> <DownOutlined />展开</template>
          </a-button>
        </a-space>
      </div>
    </a-form>
  </a-card>
</template>
