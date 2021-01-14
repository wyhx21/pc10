import Layout from '@/layout'

const order = [
  {
    path: '/order',
    component: Layout,
    meta: {
      title: '订单管理',
      id: 300003,
    },
    children: [
      {
        path: 'purchaseOrder',
        name: '采购订单管理',
        component: () => import('@/views/order/purchaseOrder'),
        meta: {
          title: '采购订单管理',
          id: 300003002,
        },
      },
    ],
  },
]

export default [...order]
