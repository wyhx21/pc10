import Layout from '@/layout'

const basic = [
  {
    path: '/basic',
    component: Layout,
    meta: {
      title: '基本信息管理',
      id: 300001,
    },
    children: [
      {
        path: 'product',
        name: '商品管理',
        component: () => import('@/views/basic/product'),
        meta: {
          title: '商品管理',
          id: 300001001,
        },
      },
      {
        path: 'customer',
        name: '客户管理',
        component: () => import('@/views/basic/customer'),
        meta: {
          title: '客户管理',
          id: 300001002,
        },
      },
    ],
  },
]

export default [...basic]
