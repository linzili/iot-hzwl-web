import Request from '@/utils/request'
import { message } from 'ant-design-vue'
import qs from 'qs'

const baseURL = import.meta.env.VITE_HTTP_URL
const timeout = 10000

const defHttp = new Request(
  {
    baseURL,
    timeout,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
  },
  (config) => {
    const loginStore = useLoginStore()
    if (loginStore.token && config.headers) {
      config.headers.Authorization = `Bearer ${loginStore.token}`
    }
    return config
  },
  (res) => {
    if (res.data.code === 200) return res.data
    else if (res.data.code === 401) {
      const loginStore = useLoginStore()
      loginStore.delToken()
      message.error(res.data.msg || '登录失效，请重新登录')
      location.reload()
    } else {
      message.error(res.data.msg)
      return Promise.reject(res.data.msg || '网络错误，请稍后再试')
    }
  }
)

export default defHttp
