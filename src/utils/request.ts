import { message } from 'ant-design-vue'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, Method } from 'axios'
import axios from 'axios'

export type Data<T> = {
  msg: string
  code: number
  data: T
}

class Request {
  private instance: AxiosInstance

  constructor(
    config: AxiosRequestConfig,
    requestInterceptor?: (config: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any>,
    responseInterceptor?: (res: AxiosResponse<Data<any>, Data<any>>) => any
  ) {
    this.instance = axios.create(config)

    // 请求拦截器
    if (requestInterceptor) {
      this.instance.interceptors.request.use(
        (config) => requestInterceptor(config),
        (err) => Promise.reject(err)
      )
    }

    // 响应拦截器
    if (responseInterceptor) {
      this.instance.interceptors.response.use(
        (res) => responseInterceptor(res),
        () => {
          message.error('网络错误，请稍后再试')
          return Promise.reject('无法访问服务器')
        }
      )
    }
  }

  get<T>(url: string, params?: object) {
    return this.request<T>(url, 'GET', undefined, params)
  }

  post<T>(url: string, submitData?: object, params?: Object) {
    return this.request<T>(url, 'POST', submitData, params)
  }

  delete<T>(url: string, submitData?: any, params?: object) {
    return this.request<T>(url, 'DELETE', submitData, params)
  }

  put<T>(url: string, submitData?: object, params?: object) {
    return this.request<T>(url, 'PUT', submitData, params)
  }

  private request<T>(url: string, method: Method = 'get', submitData?: object, params?: object) {
    return this.instance.request<T, Data<T>>({
      url,
      method,
      data: submitData,
      params
    })
  }
}

export default Request
