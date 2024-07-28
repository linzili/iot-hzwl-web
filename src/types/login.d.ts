export interface LoginForm {
  username: string
  password: string
  captcha: string
  remember: boolean
}

export interface Captcha {
  sessionId: string
  imageData: string
}
