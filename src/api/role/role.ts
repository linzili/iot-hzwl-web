import type { PageResult } from '@/types/global'
import defHttp from '..'

import type { Role, RolePageReq, SimpleRole } from '@/types/role'

const prefix = '/system/role'

export const getRoleListApi = (params: RolePageReq) => defHttp.get<PageResult<Role>>(`${prefix}/page`, params)
export const deleteRoleApi = (id: number) => defHttp.delete<boolean>(`${prefix}/${id}`)
export const editRoleApi = (data: Role) => defHttp.put<boolean>(`${prefix}`, data)
export const newRoleApi = (data: Role) => defHttp.post<number>(`${prefix}`, data)
export const getSimpleRoleListApi = () => defHttp.get<SimpleRole[]>(`${prefix}/list-all-simple`)

export const getSimpleRoleListByUserIdApi = (userId: number) => defHttp.get<SimpleRole[]>(`${prefix}/user/${userId}/list`)
