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
        path: 'instore',
        name: '订单入库',
        component: () => import('@/views/store/instore'),
        meta: {
          title: '订单入库',
          id: 300002002,
        },
      },
      {
        path: 'outstore',
        name: '订单出库',
        component: () => import('@/views/store/outstore'),
        meta: {
          title: '订单出库',
          id: 300002003,
        },
      },
      {
        path: 'storeDispacher',
        name: '库存调度',
        component: () => import('@/views/store/storeDispatch'),
        meta: {
          title: '库存调度',
          id: 300002005,
        },
      },
      {
        path: 'verifi',
        name: '库存核销',
        component: () => import('@/views/store/verify'),
        meta: {
          title: '库存核销',
          id: 300002006,
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
