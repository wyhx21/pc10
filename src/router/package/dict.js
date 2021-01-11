import Layout from '@/layout'

const dict = [
  {
    path: '/dict',
    component: Layout,
    meta: {
      title: '字典配置',
      id: 800001,
    },
    children: [
      {
        path: 'prodType',
        name: '商品类型管理',
        component: () => import('@/views/dict/prodType'),
        meta: {
          title: '商品类型管理',
          id: 800001001,
        },
      },
      {
        path: 'verifyType',
        name: '核销类型管理',
        component: () => import('@/views/dict/verifyType'),
        meta: {
          title: '核销类型管理',
          id: 800001002,
        },
      },
    ],
  },
]

export default [...dict]
