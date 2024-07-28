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
      },
      {
        path: 'system',
        name: 'System',
        redirect: { name: 'Tenant' },
        meta: {
          title: '系统管理'
        },
        children: [
          {
            path: 'tenant',
            name: 'Tenant',
            meta: {
              title: '租户管理'
            },
            redirect: { name: 'TenantList' },
            children: [
              {
                path: 'list',
                name: 'TenantList',
                component: () => import('@/views/system/tenant/Tenant.vue'),
                meta: {
                  title: '租户列表'
                }
              },
              {
                path: 'package',
                name: 'TenantPackage',
                component: () => import('@/views/system/tenantPackage/TenantPackage.vue'),
                meta: {
                  title: '租户套餐'
                }
              }
            ]
          },
          {
            path: 'user',
            name: 'User',
            component: () => import('@/views/system/users/User.vue'),
            meta: {
              title: '用户管理'
            }
          },
          {
            path: 'dict',
            name: 'Dict',
            component: () => import('@/views/system/dict/Dict.vue'),
            meta: {
              title: '字典管理'
            }
          },
          {
            path: 'dict/data/:dictType',
            name: 'DictData',
            component: () => import('@/views/system/dict/data/DictData.vue'),
            meta: {
              title: '字典数据',
              hidden: true,
              activeMenu: 'Dict'
            },
            props: true
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      title: '登录'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const title = useTitle()
router.beforeEach((to, from, next) => {
  title.value = (to.meta.title + ' - ' + import.meta.env.VITE_APP_TITLE) as string
  next()
})
export default router
