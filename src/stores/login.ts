import { accountLoginApi } from '@/api/user/login'
import type { Captcha, LoginForm } from '@/types/login'
import { message } from 'ant-design-vue'

export const useLoginStore = defineStore(
  'login',
  () => {
    const token = ref<string>()

    const loginForm = reactive<LoginForm>(
      storageUtil.getObject('loginForm') || {
        username: '',
        password: '',
        captcha: '',
        remember: true
      }
    )

    const captcha = ref<Captcha>()

    const loginBtnDisabled = computed(() => {
      return !(loginForm.username && loginForm.password)
    })
    const tenantSotre = useTenantStore()
    async function accountLoginAction() {
      const tenantId = tenantSotre.tenantInfo?.id
      if (tenantId === undefined) {
        return message.error('非法登陆，请联系管理员')
      }
      const { data } = await accountLoginApi({ ...loginForm, tenantId, sessionId: captcha.value!!.sessionId })
      token.value = data.token

      loginForm.captcha = ''
      if (loginForm.remember) {
        storageUtil.setObject('loginForm', loginForm)
      } else {
        storageUtil.remove('loginForm')
      }
    }

    function delToken() {
      token.value = undefined
    }
    async function getCaptchaAction() {
      const { data } = await getCapachaApi()
      captcha.value = data
    }
    return {
      token,
      loginForm,
      loginBtnDisabled,
      captcha,
      delToken,
      accountLoginAction,
      getCaptchaAction
    }
  },
  {
    persist: {
      paths: ['token']
    }
  }
)
