import Layout from '@/layout'

const store = [
  {
    path: '/store',
    component: Layout,
    meta: {
      title: '仓库管理',
      id: 300002,
    },
    children: [
      {
        path: 'store',
        name: '仓库管理',
        component: () => import('@/views/store/store'),
        meta: {
          title: '仓库管理',
          id: 300002001,
        },
      },
      {
        path: 'storeProd',
        name: '库存信息',
        component: () => import('@/views/store/storeProd'),
        meta: {
          title: '库存信息',
          id: 300002007,
        },
      },
    ],
  },
]

export default [...store]
