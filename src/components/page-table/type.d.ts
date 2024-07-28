import type { PageParams } from '@/types/global'
import type { ColumnProps } from 'ant-design-vue/es/table'
import type { VNode } from 'vue'

export interface IPageTableProps {
  tableConfig: IPageTableConfig
  dataList: any[] | undefined
  pageParams: PageParams
}

interface BaseColumn extends ColumnProps {
  type?: 'index' | 'handle'
}

interface ExpressionColumn extends BaseColumn {
  type: 'expression'
  expression: (record) => VNode | string | number | boolean | undefined
}

interface TagColumn extends BaseColumn {
  type: 'tag'
  color: 'default' | 'success' | 'primary' | 'warning' | 'danger'
}
interface DictTagColumn extends BaseColumn {
  type: 'dict-tag'
  dictType: string
}
interface SlotColumn extends BaseColumn {
  type: 'slot'
  slotName: string
}

interface SwitchColumn extends BaseColumn {
  type: 'switch'
  checkedValue: string | number | boolean
  unCheckedValue: string | number | boolean
}

export type Column = BaseColumn | ExpressionColumn | SlotColumn | SwitchColumn | TagColumn | DictTagColumn

export interface IPageTableConfig {
  columns?: Column[]
  header?: {
    title: string
    btnShow?: boolean
    btnTitle?: string
  }
  bordered?: boolean
  size?: 'small' | 'middle' | 'large'
  showPagination?: boolean
  total?: number
}
