export interface Menu {
  /**
   * 组件路径,仅菜单类型为菜单时，才需要传
   */
  component?: string
  /**
   * 组件名
   */
  componentName?: string
  /**
   * 菜单图标,仅菜单类型为菜单或者目录时，才需要传
   */
  icon?: string
  /**
   * 菜单编号
   */
  id?: number
  /**
   * 是否缓存
   */
  keepAlive?: boolean
  /**
   * 菜单名称
   */
  name: string
  /**
   * 父菜单 ID
   */
  parentId: number
  /**
   * 路由地址,仅菜单类型为菜单或者目录时，才需要传
   */
  path?: string
  /**
   * 权限标识,仅菜单类型为按钮时，才需要传递
   */
  permission?: string
  /**
   * 显示顺序
   */
  sort: number
  /**
   * 状态,见 CommonStatusEnum 枚举 (0 : 启用； 1 : 禁用)
   */
  status: Status
  /**
   * 类型，参见 MenuTypeEnum 枚举类 (1 : 目录； 2 : 菜单； 3 : 按钮)
   */
  type: Type
  /**
   * 是否可见
   */
  visible?: boolean
}

export interface MenuReq {
  /**
   * 菜单名称，模糊匹配
   */
  name?: string
  /**
   * 状态，参见 CommonStatusEnum 枚举类 (0 : 启用； 1 : 禁用)
   */
  status?: Status
}

export interface SimpleMenuTree {
  /**
   * 子菜单
   */
  children?: SimpleMenuTree[]
  /**
   * 菜单编号
   */
  id: number
  /**
   * 菜单名称
   */
  name: string
  /**
   * 父菜单 ID
   */
  parentId?: number
  /**
   * 菜单类型,参见 MenuTypeEnum 枚举类 (1 : 目录； 2 : 菜单； 3 : 按钮)
   */
  type?: Type
}

export interface SimpleMenu {
  /**
   * 菜单编号
   */
  id: number
  /**
   * 菜单名称
   */
  name: string
  /**
   * 父菜单 ID
   */
  parentId: number
  /**
   * 菜单类型,参见 MenuTypeEnum 枚举类 (1 : 目录； 2 : 菜单； 3 : 按钮)
   */
  type: Type
}
