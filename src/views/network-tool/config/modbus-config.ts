import type { SelectProps } from 'ant-design-vue'

export const charOrderOptionMap = new Map<any, SelectProps['options']>([
  [1, [{ value: 'asc', label: 'AA' }]],
  [
    2,
    [
      { value: 'asc', label: 'AABB' },
      { value: 'desc', label: 'BBAA' }
    ]
  ],
  [
    3,
    [
      { value: 'asc', label: 'AABBCC' },
      { value: 'desc', label: 'CCBBAA' }
    ]
  ],
  [
    4,
    [
      { value: 'asc', label: 'AABBCCDD' },
      { value: 'desc', label: 'DDCCBBAA' },
      { value: 'ascAndDesc', label: 'BBAADDCC' },
      { value: 'descAndAsc', label: 'CCDDAABB' }
    ]
  ],
  ['other', [{ value: 'asc', label: 'AABBCCDDEEFF' }]]
])

export const charCountOption: SelectProps['options'] = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 6, label: '6' },
  { value: 8, label: '8' }
]

export const checkTypeOption: SelectProps['options'] = [{ value: 'CRC16', label: 'CRC16' }]

export const dataTypeOption: SelectProps['options'] = [
  { value: 'SignedInt', label: '有符号整数' },
  { value: 'UnsignedInt', label: '无符号整数' },
  { value: 'Double', label: '双精度浮点类型' },
  { value: 'Float', label: '单精度浮点类型' },
  { value: 'BCD', label: 'BCD码' },
  { value: 'HEX', label: 'HEX' }
]
