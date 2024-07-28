import type { PageResult } from '@/types/global'
import defHttp from '..'

import type { DictData, DictDataPageReq, SimpleDictData } from '@/types/dict'

const prefix = '/system/dict-data'

export const getDictDataListApi = (params: DictDataPageReq) => defHttp.get<PageResult<DictData>>(`${prefix}/page`, params)
export const deleteDictDataApi = (id: number) => defHttp.delete<boolean>(`${prefix}/${id}`)
export const editDictDataApi = (data: DictData) => defHttp.put<boolean>(`${prefix}`, data)
export const newDictDataApi = (data: DictData) => defHttp.post<number>(`${prefix}`, data)
export const getSimpleDictDataListApi = () => defHttp.get<SimpleDictData[]>(`${prefix}/list-all-simple`)
