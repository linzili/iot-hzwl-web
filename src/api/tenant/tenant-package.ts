import type { PageResult } from '@/types/global'
import defHttp from '..'

import type { SimpleTenantPackage, TenantPackage, TenantPackagePageReq } from '@/types/tenant'

const prefix = '/system/tenant-package'

export const getTenantPackageListApi = (params: TenantPackagePageReq) => defHttp.get<PageResult<TenantPackage>>(`${prefix}/page`, params)
export const deleteTenantPackageApi = (id: number) => defHttp.delete<boolean>(`${prefix}/${id}`)
export const editTenantPackageApi = (data: TenantPackage) => defHttp.put<boolean>(`${prefix}`, data)
export const newTenantPackageApi = (data: TenantPackage) => defHttp.post<number>(`${prefix}`, data)
export const getSimpleTenantPackageListApi = () => defHttp.get<SimpleTenantPackage[]>(`${prefix}/list-all-simple`)
