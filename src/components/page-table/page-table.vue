<script lang="ts" setup>
import type { PageParams } from '@/types/global'
import type { Column, DictTagColumn, ExpressionColumn, IPageTableProps, SlotColumn, SwitchColumn, TagColumn } from './type'
import type { TablePaginationConfig } from 'ant-design-vue'
import { isVNode } from 'vue'
import DictTag from '../dict-tag/src/dict-tag.vue'

defineProps<IPageTableProps>()
const pageParams = defineModel<PageParams>('pageParams', { required: true })
defineEmits<{
  (e: 'edit', record: any): void
  (e: 'onEdit', record: any): void
  (e: 'onCreate'): void
  (e: 'delete', id: number): void
}>()

const loading = defineModel<boolean>('loading')

function handleChange(pagination: TablePaginationConfig) {
  pageParams.value.page = pagination.current!
  pageParams.value.size = pagination.pageSize!
}
</script>

<template>
  <a-card>
    <!-- header -->
    <div v-if="tableConfig.header !== undefined" class="flex justify-between pb-2 items-center">
      <div class="left">
        <a-space>
          <a-typography-title :content="tableConfig.header?.title" :level="4" />
          <slot name="header-left" />
        </a-space>
      </div>
      <div class="right">
        <a-space>
          <slot name="header-right" />
          <a-button v-if="tableConfig.header.btnShow !== false" type="primary" @click="$emit('onCreate')">
            {{ tableConfig.header.btnTitle || '新增' }}
          </a-button>
        </a-space>
      </div>
    </div>

    <!-- table -->
    <a-table
      :rorKey="tableConfig.rowKey"
      :data-source="dataList"
      :loading
      defaultExpandAllRows
      :pagination="
        tableConfig.showPagination === false
          ? false
          : {
              total: tableConfig.total,
              showTotal: (total: number) => `共 ${total} 条`
            }
      "
      v-bind="tableConfig"
      @change="handleChange"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="(column as Column).type === 'slot'">
          <slot :name="(column as SlotColumn).slotName" :record="record" />
        </template>
        <template v-else-if="(column as Column).type === 'expression'">
          <template v-if="isVNode((column as ExpressionColumn).expression(record))">
            <component :is="(column as ExpressionColumn).expression(record)"></component>
          </template>
          <template v-else>
            {{ (column as ExpressionColumn).expression(record) }}
          </template>
        </template>
        <template v-else-if="(column as Column).type === 'switch'">
          <a-switch
            v-model:checked="record[column.dataIndex!.toString()]"
            :checked-value="(column as SwitchColumn).checkedValue"
            :un-checked-value="(column as SwitchColumn).unCheckedValue"
            @change="$emit('edit', record)"
          />
        </template>
        <template v-else-if="(column as Column).type === 'tag'">
          <a-tag :color="(column as TagColumn).color === 'primary' ? 'processing' : (column as TagColumn).color">
            {{ record[column.dataIndex!.toString()] }}
          </a-tag>
        </template>

        <template v-else-if="(column as Column).type === 'dict-tag'">
          <DictTag :type="(column as DictTagColumn).dictType" :value="record[column.dataIndex!]" />
        </template>
        <template v-else-if="(column as Column).type === 'handle'">
          <slot name="handle-before" v-bind="record" />
          <a-button size="small" type="link" @click="$emit('onEdit', record)">编辑</a-button>
          <a-popconfirm placement="topRight" title="你确定要删除吗?" @confirm="$emit('delete', record.id)">
            <a-button danger size="small" type="text">删除</a-button>
          </a-popconfirm>
          <slot name="handle-after" v-bind="record" />
        </template>
        <template v-else-if="(column as Column).type === 'index'">
          {{ index + 1 }}
        </template>
      </template>
    </a-table>
  </a-card>
</template>
