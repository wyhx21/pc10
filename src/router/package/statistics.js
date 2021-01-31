import Layout from '@/layout'

const statistics = [
  {
    path: '/statistics',
    component: Layout,
    meta: {
      title: '数据统计',
      id: 700001,
    },
    children: [
      {
        path: 'saleOrder',
        name: '销售订单统计',
        component: () => import('@/views/statistics/saleOrder'),
        meta: {
          title: '销售订单统计',
          id: 700001001,
        },
      },
      {
        path: 'purchaseOrder',
        name: '采购订单统计',
        component: () => import('@/views/statistics/purchaseOrder'),
        meta: {
          title: '采购订单统计',
          id: 700001002,
        },
      },
      {
        path: 'saleOrderProduct',
        name: '销售订单商品统计',
        component: () => import('@/views/statistics/saleOrderProduct'),
        meta: {
          title: '销售订单商品统计',
          id: 700001003,
        },
      },
      {
        path: 'purchaseOrderProduct',
        name: '采购订单商品统计',
        component: () => import('@/views/statistics/purchaseOrderProduct'),
        meta: {
          title: '采购订单商品统计',
          id: 700001004,
        },
      },
    ],
  },
]

export default [...statistics]
