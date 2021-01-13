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
    ],
  },
]

export default [...store]
