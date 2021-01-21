import Layout from '@/layout'

const systemMsg = [
  {
    path: '/systemMsg',
    component: Layout,
    meta: {
      title: '消息设置',
      id: 900002,
    },
    children: [
      {
        path: 'main',
        name: '主页消息',
        component: () => import('@/views/systemMsg/mainMsg'),
        meta: {
          title: '主页消息',
          id: 900002001,
        },
      },
    ],
  },
]

export default [...systemMsg]
