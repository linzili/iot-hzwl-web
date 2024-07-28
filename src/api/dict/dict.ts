import type { PageResult } from '@/types/global'
import defHttp from '..'

import type { Dict, DictPageReq, SimpleDict } from '@/types/dict'

const prefix = '/system/dict-type'

export const getDictListApi = (params: DictPageReq) => defHttp.get<PageResult<Dict>>(`${prefix}/page`, params)
export const deleteDictApi = (id: number) => defHttp.delete<boolean>(`${prefix}/${id}`)
export const editDictApi = (data: Dict) => defHttp.put<boolean>(`${prefix}`, data)
export const newDictApi = (data: Dict) => defHttp.post<number>(`${prefix}`, data)

export const getSimpleDictListApi = () => defHttp.get<SimpleDict[]>(`${prefix}/list-all-simple`)
