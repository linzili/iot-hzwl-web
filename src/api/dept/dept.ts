import type { PageResult } from '@/types/global'
import defHttp from '..'

import type { Dept, DeptReq, SimpleDept, SimpleDeptTree } from '@/types/dept'

const prefix = '/system/dept'

export const getDeptListApi = (params: DeptReq) => defHttp.get<PageResult<Dept>>(`${prefix}/list`, params)
export const deleteDeptApi = (id: number) => defHttp.delete<boolean>(`${prefix}/${id}`)
export const editDeptApi = (data: Dept) => defHttp.put<boolean>(`${prefix}`, data)
export const newDeptApi = (data: Dept) => defHttp.post<number>(`${prefix}`, data)

export const getSimpleDeptListApi = () => defHttp.get<SimpleDept[]>(`${prefix}/list-all-simple`)

export const getDeptTreeListApi = (params: DeptReq) => defHttp.get<PageResult<Dept>>(`${prefix}/list-tree`, params)

export const getSimpleDeptTreeListApi = () => defHttp.get<SimpleDeptTree[]>(`${prefix}/list-all-simple-tree`)
