import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/Layout.vue'),
    redirect: '/network-tool',
    children: [
      {
        path: '/network-tool',
        name: 'SerialPort',
        redirect: '/connection-test',
        meta: {
          title: '物联工具'
        },
        children: [
          {
            path: '/connection-test',
            name: 'ConnectionTest',
            component: () => import('@/views/network-tool/network-tool.vue'),
            meta: {
              title: '连接测试'
            }
          },
          {
            path: '/serial-port',
            name: 'SerialPort',
            component: () => import('@/views/network-tool/network-tool.vue'),
            meta: {
              title: '串口映射'
            }
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
