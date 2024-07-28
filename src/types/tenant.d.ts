import type { PageParams, Status } from './global'

export interface Tenant {
  /**
   * 租户编号
   */
  id?: number
  /**
   * 租户名称
   */
  name: string
  /**
   * 联系人名称
   */
  contactName: string
  /**
   * 联系电话
   */
  contactPhone: string
  /**
   * 联系人用户编号
   */
  contactUserId: number
  /**
   * 账号数量
   */
  accountCount: number

  /**
   * 过期时间
   */
  expireTime: Date

  /**
   * 套餐编号
   */
  packageId: string
  /**
   * 状态 (0 : 启用； 1 : 禁用)
   */
  status: Status
  /**
   * 域名
   */
  website: string
}

export interface TenantPackage {
  /**
   * 租户套餐编号
   */
  id?: number
  /**
   * 菜单编号列表
   */
  menuIds: number[]
  /**
   * 租户套餐名称
   */
  name: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 状态 (0 : 启用； 1 : 禁用)
   */
  status: Status
}

export interface TenantPageReq extends PageParams {
  /**
   * 租户名,模糊匹配
   */
  name?: string
  /**
   * 联系人,模糊匹配
   */
  contactName?: string
  /**
   * 套餐编号
   */
  packageId?: string

  /**
   * 租户状态（0正常 1停用） (0 : 启用； 1 : 禁用)
   */
  status?: Status
  /**
   * 域名
   */
  website?: string

  /**
   * 创建时间
   */
  createTime?: Date[]
}

export interface TenantPackagePageReq extends PageParams {
  /**
   * 租户套餐名,模糊匹配
   */
  name?: string
  /**
   * 状态 (0 : 启用； 1 : 禁用)
   */
  status?: Status

  /**
   * 创建时间
   */
  createTime?: Date[]
}

export interface SimpleTenantPackage {
  /**
   * 租户套餐编号
   */
  id: string

  /**
   * 租户套餐名称
   */
  name: string
}
