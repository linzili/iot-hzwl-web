const dictStore = useDictStore()
export const getDictOptions = (dictType: string) => {
  return dictStore.getDictByType(dictType)
}

export const ColorTypeOption = [
  { label: '默认(default)', value: 1, color: 'default' },
  { label: '主要(primary)', value: 2, color: 'processing' },
  { label: '成功(success)', value: 3, color: 'success' },
  { label: '警告(warning)', value: 4, color: 'warning' },
  { label: '危险(danger)', value: 5, color: 'danger' }
]

export enum DICT_TYPE {
  // ========== SYSTEM 模块 ==========
  SYSTEM_USER_SEX = 'sys_user_sex',
  SYSTEM_COMMON_STATUS = 'sys_common_status'
}
