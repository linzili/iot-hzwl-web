export interface IBaseFormItem {
  label: string
  prop: string
  type: 'input' | 'date-picker'
  defaultValue?: string
  placeholder?: string
  defaultHide?: boolean
}

export interface ISelectFormItem extends IBaseFormItem {
  type: 'select'
  options: Array<any> | Ref<Array<any>>
  fieldNames?: {
    label?: 'label' | string
    value?: 'value' | string
  }
}
export interface IDictSelectFormItem extends IBaseFormItem {
  type: 'dict-select'
  dictType: string
}

type IFormItem = IBaseFormItem | ISelectFormItem | IDictSelectFormItem
export interface IPageSearchConfig {
  /**
   * 搜索框配置
   */
  formItems: IFormItem[]
  lineItemCount?: number
  labelCol?: Partial<
    import('vue').ExtractPropTypes<{
      span: (StringConstructor | NumberConstructor)[]
      order: (StringConstructor | NumberConstructor)[]
      offset: (StringConstructor | NumberConstructor)[]
      push: (StringConstructor | NumberConstructor)[]
      pull: (StringConstructor | NumberConstructor)[]
      xs: {
        type: import('vue').PropType<string | number | import('../grid').ColSize>
        default: string | number | import('../grid').ColSize
      }
      sm: {
        type: import('vue').PropType<string | number | import('../grid').ColSize>
        default: string | number | import('../grid').ColSize
      }
      md: {
        type: import('vue').PropType<string | number | import('../grid').ColSize>
        default: string | number | import('../grid').ColSize
      }
      lg: {
        type: import('vue').PropType<string | number | import('../grid').ColSize>
        default: string | number | import('../grid').ColSize
      }
      xl: {
        type: import('vue').PropType<string | number | import('../grid').ColSize>
        default: string | number | import('../grid').ColSize
      }
      xxl: {
        type: import('vue').PropType<string | number | import('../grid').ColSize>
        default: string | number | import('../grid').ColSize
      }
      prefixCls: StringConstructor
      flex: (StringConstructor | NumberConstructor)[]
    }>
  > &
    import('vue').HTMLAttributes
}

export interface IPageSearchProps {
  searchConfig: IPageSearchConfig
}
