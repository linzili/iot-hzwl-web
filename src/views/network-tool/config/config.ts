import type { SelectProps } from 'ant-design-vue'

const baudList = ref<SelectProps['options']>([
  { value: '300', label: '300' },
  { value: '600', label: '600' },
  { value: '1200', label: '1200' },
  { value: '2400', label: '2400' },
  { value: '4800', label: '4800' },
  { value: '9600', label: '9600' },
  { value: '19200', label: '19200' },
  { value: '38400', label: '38400' },
  { value: '57600', label: '57600' },
  { value: '115200', label: '115200' }
])

const dataBitsList = ref<SelectProps['options']>([
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 }
])

const parityList = ref<SelectProps['options']>([
  { value: 'N', label: 'None' },
  { value: 'O', label: 'Odd' },
  { value: 'E', label: 'Even' },
  { value: 'M', label: 'Mark' },
  { value: 'S', label: 'Space' }
])

const stopBitsList = ref<SelectProps['options']>([
  { value: 1, label: 1 },
  { value: 2, label: 2 }
])

const dateTypeList = ref<SelectProps['options']>([
  { value: 'hex', label: 'HEX' },
  { value: 'utf-8', label: 'utf-8' },
  { value: 'unicode', label: 'Unicode' }
])

export { baudList, dataBitsList, parityList, stopBitsList, dateTypeList }
