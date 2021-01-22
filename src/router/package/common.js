const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/system/login'),
    meta: {
      title: '登录',
      id: 0,
    },
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/system/403'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/system/404'),
    hidden: true,
  },
]

export default [...constantRoutes]
