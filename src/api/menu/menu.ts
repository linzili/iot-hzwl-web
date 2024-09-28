import type { PageResult } from '@/types/global'
import defHttp from '..'

import type { Menu, MenuReq, SimpleMenuTree } from '@/types/menu'

const prefix = '/system/menu'

export const getMenuListApi = (params: MenuReq) => defHttp.get<PageResult<Menu>>(`${prefix}/list`, params)
export const deleteMenuApi = (id: number) => defHttp.delete<boolean>(`${prefix}/${id}`)
export const editMenuApi = (data: Menu) => defHttp.put<boolean>(`${prefix}`, data)
export const newMenuApi = (data: Menu) => defHttp.post<number>(`${prefix}`, data)

export const getMenuTreeListApi = (params: MenuReq) => defHttp.get<PageResult<Menu>>(`${prefix}/tree`, params)
export const getSimpleMenuTreeListApi = () => defHttp.get<SimpleMenuTree[]>(`${prefix}/tree-all-simple`)
