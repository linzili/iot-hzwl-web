import type { PermissionAssignUserRoleReq } from '@/types/permission'
import defHttp from '..'

const prefix = '/system/permission'

export const assignUserRoleApi = (data: PermissionAssignUserRoleReq) => defHttp.post<boolean>(`${prefix}/assign-user-role`, data)

export const getRoleMenuListApi = (roleId: number) => defHttp.get<number[]>(`${prefix}/list-role-menus`, { roleId })

export const assignRolePermissionApi = (roleId: number, menuIds: number[]) =>
  defHttp.post<boolean>(`${prefix}/assign-role-permission`, { roleId, menuIds })
