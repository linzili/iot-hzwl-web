import type { Status } from './global'

export interface DeptReq {
  /**
   * 部门名称,模糊匹配
   */
  name?: string
  /**
   * 部门状态（0正常 1停用）,参见 CommonStatusEnum 枚举类 (0 : 启用； 1 : 禁用)
   */
  status?: Status
}

export interface Dept {
  /**
   * 部门编号
   */
  id?: number
  /**
   * 部门名称
   */
  name: string
  /**
   * 父部门编号
   */
  parentId?: number
  /**
   * 部门排序
   */
  sort: number
  /**
   * 邮箱
   */
  email?: string

  /**
   * 负责人的用户编号
   */
  leaderUserId?: number

  /**
   * 联系电话
   */
  phone?: string

  /**
   * 部门状态（0正常 1停用） (0 : 启用； 1 : 禁用)
   */
  status: Status

  /**
   * 子部门
   */
  children?: Dept[]
  /**
   * 创建时间
   */
  createTime: string
}

export interface SimpleDept {
  /**
   * 部门编号
   */
  id: number
  /**
   * 部门名称
   */
  name: string
  /**
   * 父部门编号
   */
  parentId: number
}

export interface SimpleDeptTree {
  /**
   * 子部门
   */
  children?: SimpleDeptTree[]
  /**
   * 部门编号
   */
  id: number
  /**
   * 部门名称
   */
  name: string
  /**
   * 父部门编号
   */
  parentId?: number
}
