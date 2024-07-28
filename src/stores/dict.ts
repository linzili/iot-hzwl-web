import type { SimpleDict, SimpleDictData } from '@/types/dict'

export const useDictStore = defineStore('dict', () => {
  const simpleDictTypeList = ref<SimpleDict[]>([])

  const getSimpleDictListAction = async () => {
    const { data } = await getSimpleDictListApi()
    simpleDictTypeList.value = data
  }

  const dictMap = ref<Map<string, SimpleDictData[]>>(new Map<string, SimpleDictData[]>())
  const isSetDict = ref(false)
  const setDictMapAction = async () => {
    const { data } = await getSimpleDictDataListApi()
    const dictDataMap = new Map<string, SimpleDictData[]>()
    data.forEach((dictData: SimpleDictData) => {
      if (dictDataMap.has(dictData.dictType)) {
        dictDataMap.get(dictData.dictType)?.push(dictData)
      } else {
        dictDataMap.set(dictData.dictType, [dictData])
      }
    })
    dictMap.value = dictDataMap
    isSetDict.value = true
  }

  const getDictByType = (type: string): SimpleDictData[] => {
    if (!isSetDict.value) {
      setDictMapAction()
    }

    return dictMap.value.get(type) || []
  }
  return {
    simpleDictTypeList,
    getSimpleDictListAction,
    dictMap,
    setDictMapAction,
    getDictByType
  }
})
