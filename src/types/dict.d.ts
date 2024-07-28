import type { PageParams, Status } from './global'

export interface DictData {
  /**
   * 字典数据编号
   */
  id?: number
  /**
   * 字典类型
   */
  dictType: string
  /**
   * 字典标签
   */
  label: string
  /**
   * 字典值
   */
  value: string
  /**
   * 排序值
   */
  sort: number
  /**
   * 状态 (0 : 启用； 1 : 禁用)
   */
  status: Status

  /**
   * 颜色类型, default、primary、success、warning、danger、info
   */
  colorType?: string
  /**
   * CSS 样式
   */
  cssClass?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 创建时间
   */
  createTime: string
}

export interface DictDataPageReq extends PageParams {
  /**
   * 字典类型
   */
  dictType: string
  /**
   * 字典标签 模糊匹配
   */
  label?: string

  /**
   * 展示状态 (0 : 启用； 1 : 禁用)
   */
  status?: Status
}

export interface Dict {
  /**
   * 字典类型编号
   */
  id?: number
  /**
   * 字典名称
   */
  name: string

  /**
   * 状态 (0 : 启用； 1 : 禁用)
   */
  status: Status
  /**
   * 字典类型
   */
  type: string
  /**
   * 备注
   */
  remark?: string

  /**
   * 创建时间
   */
  createTime: string
}

export interface DictPageReq extends PageParams {
  /**
   * 字典类型名称,模糊匹配
   */
  name?: string

  /**
   * 状态,参见 CommonStatusEnum 枚举类 (0 : 启用； 1 : 禁用)
   */
  status?: Status
  /**
   * 字典类型,模糊匹配
   */
  type?: string
  /**
   * 创建时间
   */
  createTime?: Date[]
}

export interface SimpleDict {
  id: string
  name: string
  type: string
}

type ColorType = 1 | 2 | 3 | 4 | 5

export interface SimpleDictData {
  dictType: string
  label: string
  value: number
  colorType: ColorType
  cssClass: string
}
