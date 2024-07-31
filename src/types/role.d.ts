import type { PageParams, Status } from './global'

export interface Role {
  /**
   * 角色编号
   */
  id: number
  /**
   * 角色名称
   */
  name: string
  /**
   * 角色标识
   */
  code: string
  /**
   * 角色排序
   */
  sort: number
  /**
   * 角色状态（0正常 1停用） (0 : 启用； 1 : 禁用)
   */
  status: Status
  /**
   * 角色类型 (1 : 系统角色； 2 : 自定义角色)
   */
  type: number

  /**
   * 数据范围 (1 : 全部数据权限； 2 : 自定数据权限； 3 : 本部门及以下数据权限； 4 : 本部门数据权限)
   */
  dataScope: DataScope
  /**
   * 数据范围(指定部门数组)
   */
  dataScopeDeptIds?: number[]

  /**
   * 备注
   */
  remark?: string
  /**
   * 创建时间
   */
  createTime: string
}

export interface RolePageReq extends PageParams {
  /**
   * 角色名称,模糊匹配
   */
  name?: string

  /**
   * 角色标识，模糊匹配
   */
  code?: string

  /**
   * 角色状态（0正常 1停用）,参见 CommonStatusEnum 枚举类 (0 : 启用； 1 : 禁用)
   */
  status?: Status

  /**
   * 创建时间
   */
  createTime?: Date[]
}

export interface SimpleRole {
  /**
   * 角色编号
   */
  id: number
  /**
   * 角色名称
   */
  name: string
}
