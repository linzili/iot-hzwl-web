import type { Captcha } from '@/types/login'
import defHttp from '..'

const prefix = '/system/auth'
export type AccountLogin = {
  username: string
  password: string
  captcha: string
  sessionId: string
  hostname: string
}
export const getCapachaApi = () => defHttp.get<Captcha>(`${prefix}/captcha`)

export const accountLoginApi = (data: AccountLogin) => defHttp.post(`${prefix}/account-login`, data)
