import type { PageResult } from '@/types/global'
import defHttp from '..'
import type { User, UserPageReq } from '@/types/user'

const prefix = '/system/users'

export const getUserListApi = (params: UserPageReq) => defHttp.get<PageResult<User>>(`${prefix}/page`, params)
export const deleteUserApi = (id: number) => defHttp.delete<boolean>(`${prefix}/${id}`)
export const editUserApi = (data: User) => defHttp.put<boolean>(`${prefix}`, data)
export const newUserApi = (data: User) => defHttp.post<number>(`${prefix}`, data)
