import { accountLoginApi } from '@/api/user/login'
import type { Captcha, LoginForm } from '@/types/login'

export const useLoginStore = defineStore(
  'login',
  () => {
    const token = ref<string>()

    const loginForm = reactive<LoginForm>({
      username: '',
      password: '',
      captcha: '',
      remember: true
    })

    const captcha = ref<Captcha>()

    const loginBtnDisabled = computed(() => {
      return !(loginForm.username && loginForm.password)
    })

    async function accountLoginAction() {
      const hostname = window.parent.location.hostname || window.location.hostname

      const { data } = await accountLoginApi({ ...loginForm, hostname, sessionId: captcha.value!!.sessionId })
      console.log(data)

      loginForm.captcha = ''
      if (!loginForm.remember) {
        loginForm.username = ''
        loginForm.password = ''
      }
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
      accountLoginAction,
      getCaptchaAction
    }
  },
  {
    persist: {
      paths: ['loginForm', 'token']
    }
  }
)
