const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/system/login'),
    hidden: true,
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
