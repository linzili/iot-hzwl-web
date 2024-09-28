import type { Captcha } from '@/types/login'
import defHttp from '..'

const prefix = '/system/auth'
export type AccountLogin = {
  username: string
  password: string
  captcha: string
  sessionId: string
  tenantId: number
}
export const getCapachaApi = () => defHttp.get<Captcha>(`${prefix}/captcha`)

export const accountLoginApi = (data: AccountLogin) => defHttp.post<any>(`${prefix}/account-login`, data)
