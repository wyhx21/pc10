import Layout from '@/layout'

const systemInfo = [
  {
    path: '/systemInfo',
    component: Layout,
    redirect: '/systemInfo/system',
    meta: {
      title: '系统管理',
      id: 900001,
    },
    children: [
      {
        path: 'system',
        name: '系统设置',
        component: () => import('@/views/systemInfo/system'),
        meta: {
          title: '系统设置',
          id: 900001001,
        },
      },
      {
        path: 'role',
        name: '角色设置',
        component: () => import('@/views/systemInfo/role'),
        meta: {
          title: '角色设置',
          id: 900001002,
        },
      },
      {
        path: 'user',
        name: '用户设置',
        component: () => import('@/views/systemInfo/user'),
        meta: {
          title: '用户设置',
          id: 900001003,
        },
      },
    ],
  },
]

export default [...systemInfo]
