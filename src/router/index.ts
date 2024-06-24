import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/Layout.vue'),
    redirect: 'network-tool',
    children: [
      {
        path: 'network-tool',
        name: 'NetworkTool',
        component: () => import('@/views/network-tool/network-tool.vue'),
        redirect: { name: 'ConnectionTest' },
        meta: {
          title: '物联工具'
        },
        children: [
          {
            path: 'connection-test',
            name: 'ConnectionTest',
            component: () => import('@/views/network-tool/components/online-debug.vue'),
            meta: {
              title: '连接测试'
            }
          },
          {
            path: 'serial-port',
            name: 'SerialPort',
            component: () => import('@/views/network-tool/components/serial-mapping.vue'),
            meta: {
              title: '串口映射'
            }
          },
          {
            path: 'modbus-parse',
            name: 'ModbusParse',
            component: () => import('@/views/network-tool/components/modbus.vue'),
            meta: {
              title: 'Modbus解析'
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

const title = useTitle()
router.beforeEach((to, from, next) => {
  title.value = (import.meta.env.VITE_APP_TITLE + ' - ' + to.meta.title) as string
  next()
})
export default router
