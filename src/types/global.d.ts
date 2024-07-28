export type Status = 0 | 1

export type PageParams = {
  /**
   * 页码, 从1开始
   */
  page: number
  /**
   * 每页条数, 最大值为 100
   */
  size: number
}

export type PageResult<T> = {
  total: number

  list: Array<T>
}

export interface BasePojo {
  id?: number
}

/**
 * 用户性别（0男 1女 2未知） (0 : 男； 1 : 女； 2 : 未知)
 */
export enum Sex {
  Man = '0',
  Women = '1',
  Unknow = '2'
}
