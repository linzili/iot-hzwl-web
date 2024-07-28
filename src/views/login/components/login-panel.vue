<script lang="ts" setup>
const loginStore = useLoginStore()
const { loginForm, loginBtnDisabled, captcha } = toRefs(loginStore)

onMounted(() => {
  loginStore.getCaptchaAction()
})
</script>

<template>
  <div id="components-form-demo-normal-login" class="flex flex-col items-center">
    <div class="mt-32 mb-20 text-xl font-bold">翰臻云</div>
    <a-form class="w-2/3" layout="vertical">
      <a-form-item label="账号">
        <a-input v-model:value="loginForm.username">
          <template #prefix>
            <UserOutlined />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="密码">
        <a-input-password v-model:value="loginForm.password">
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item label="验证码">
        <a-row :gutter="8">
          <a-col flex="1">
            <a-input v-model:value="loginForm.captcha">
              <template #prefix>
                <SafetyOutlined />
              </template>
            </a-input>
          </a-col>
          <a-col flex="160px">
            <a-image :preview="false" :src="captcha?.imageData" height="32px" width="100%" @click="loginStore.getCaptchaAction" />
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item>
        <a-form-item no-style>
          <a-checkbox v-model:checked="loginForm.remember">记住密码</a-checkbox>
        </a-form-item>
        <a-typography-link class="float-right">忘记密码</a-typography-link>
      </a-form-item>

      <a-form-item>
        <a-button :disabled="loginBtnDisabled" class="w-full" type="primary" @click="loginStore.accountLoginAction">登陆</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
