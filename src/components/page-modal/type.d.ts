import type { Rule } from 'ant-design-vue/es/form'

export interface IPageModalProps {
  modalConfig: IPageModalConfig
}

export interface IPageModalConfig {
  header: {
    newTitle: string
    editTitle: string
  }
  labelAlight: 'left' | 'right'
  formItems: FormItem[]
  formRule?: {
    [k: string]: Rule | Rule[]
  }
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

type FormItemBase = {
  placeholder?: string
  initialValue?: string | number
  label?: string | ((formData: any) => string)
  mode?: 'new' | 'edit'
  [key: string]: any
}

type FormItemWithNone = FormItemBase & {
  type: 'none'
}
type FormItemWithInput = FormItemBase & {
  prop: string
  type: 'input'
}

type FormItemWithInputNumber = FormItemBase & {
  prop: string
  type: 'input-number'
  max?: number
  min?: number
}

type FormItemWithSelect = FormItemBase & {
  prop: string
  type: 'select' | 'tree-select'
  options: Array<any> | Ref<Array<any>>
  fieldNames?: {
    label?: 'label' | string
    value?: 'value' | string
  }
}

type FormItemWithSlot = FormItemBase & {
  type: 'slot'
  slotName: string
  options?: Array<any> | Ref<Array<any>>
  fieldNames?: {
    label?: 'label' | string
    value?: 'value' | string
  }
}

type FormItemWithDict = FormItemBase & {
  prop: string
  type: 'dict-radio' | 'dict-select'
  dictType: string
  fieldNames?: {
    label?: 'label' | string
    value?: 'value' | string
  }
}

type FormItemWithDatePicker = FormItemBase & {
  prop: string
  type: 'date-picker'
}
type FormItemWithTextarea = FormItemBase & {
  prop: string
  type: 'textarea'
  maxRows?: number
  minRows?: number
}

type FormItemWithRadio = FormItemBase & {
  prop: string
  type: 'radio'
  options: Array<any> | Ref<Array<any>>
  fieldNames?: {
    label?: 'label' | string
    value?: 'value' | string
  }
}
type FormItem =
  | FormItemWithDatePicker
  | FormItemWithInput
  | FormItemWithSelect
  | FormItemWithSlot
  | FormItemWithTextarea
  | FormItemWithRadio
  | FormItemWithInputNumber
  | FormItemWithNone
  | FormItemWithDict
