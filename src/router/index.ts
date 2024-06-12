import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/connection-test'
    },
    {
      path: '/connection-test',
      name: '连接测试',
      component: () => import('@/views/network-tool/network-tool.vue')
    },
    {
      path: '/serial-port',
      name: '串口映射',
      component: () => import('@/views/network-tool/network-tool.vue')
    }
  ]
})

export default router
