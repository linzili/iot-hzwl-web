import type { PageParams, Sex, Status } from './global'

export interface User {
  /**
   * 用户编号
   */
  id: number
  /**
   * 用户账号
   */
  username: string

  /**
   * 用户昵称
   */
  nickname: string

  /**
   * 邮箱
   */
  email?: string
  /**
   * 手机号码
   */
  phone: string
  /**
   * 用户状态（0正常 1停用） (0 : 启用； 1 : 禁用)
   */
  status: Status

  /**
   * 用户性别（0男 1女 2未知） (0 : 男； 1 : 女； 2 : 未知)
   */
  sex: Sex

  /**
   * 头像
   */
  avatar?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 最后登录时间
   */
  loginDate?: Date
  /**
   * 最后登录IP
   */
  loginIp?: string
  /**
   * 创建时间
   */
  createTime: string
}

export interface UserPageReq extends PageParams {
  /**
   * 用户账号,模糊匹配
   */
  username?: string
  /**
   * 手机号码,模糊匹配
   */
  phone?: string
  /**
   * 用户状态（0正常 1停用）,参见 CommonStatusEnum 枚举类 (0 : 启用； 1 : 禁用)
   */
  status?: Status
  /**
   * 创建时间
   */
  createTime?: Date[]
}
