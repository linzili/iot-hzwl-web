class StorageUtil {
  public localStorage: Storage
  // localStorage 是一个 Object
  constructor() {
    if (!localStorage) {
      throw new Error('Current brower does not support Local Storage')
    }
    this.localStorage = localStorage
  }
  /**
   * 保存字符串
   * @param {string} key
   * @param {string} value
   */
  public set(key: string, value: string): void {
    this.localStorage[key] = value
  }
  /**
   * 获取保存的字符串
   * @param {string} key
   * @returns {string}
   */
  public get(key: string): string {
    return this.localStorage[key] || ' '
  }
  /**
   * 保存对象
   * @param {string} key
   * @param  value
   */
  public setObject(key: string, value: any): void {
    this.localStorage[key] = JSON.stringify(value)
  }
  /**
   * 获取保存对象
   * @param {string} key
   * @returns {any}
   */
  public getObject(key: string): any {
    try {
      return JSON.parse(this.localStorage[key])
    } catch (e: any) {
      return undefined
    }
  }
  /**
   * 移除保存的数据
   * @param {string} key
   * @returns {any}
   */
  public remove(key: string): any {
    this.localStorage.removeItem(key)
  }
}
export const storageUtil = new StorageUtil()
