import type { PageResult } from '@/types/global'
import defHttp from '..'

import type { Tenant, TenantPageReq } from '@/types/tenant'

const prefix = '/system/tenant'

export const getTenantListApi = (params: TenantPageReq) => defHttp.get<PageResult<Tenant>>(`${prefix}/page`, params)
export const deleteTenantApi = (id: number) => defHttp.delete<boolean>(`${prefix}/${id}`)
export const editTenantApi = (data: Tenant) => defHttp.put<boolean>(`${prefix}`, data)
export const newTenantApi = (data: Tenant) => defHttp.post<number>(`${prefix}`, data)
