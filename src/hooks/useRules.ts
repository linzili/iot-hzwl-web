import type { Rule } from 'ant-design-vue/es/form'

function useRules() {
  const hexRule: Rule[] = [
    {
      message: 'Hex格式不正确',
      trigger: 'blur',
      pattern: /^[0-9A-Fa-f]+$/
    }
  ]

  return { hexRule }
}
export default useRules()
