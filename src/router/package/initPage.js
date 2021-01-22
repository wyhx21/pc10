import Layout from '@/layout'

const hone = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home-4-line',
      affix: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/systemInfo/index'),
        meta: {
          title: '首页',
          icon: 'home-4-line',
          affix: true,
        },
      },
    ],
  },
]

const error = [
  {
    path: '/error',
    name: 'Error',
    component: Layout,
    redirect: '/error/403',
    meta: {
      title: '错误页',
      icon: 'error-warning-line',
    },
    children: [
      {
        path: '403',
        name: 'Error403',
        component: () => import('@/views/system/403'),
        meta: {
          title: '403',
          icon: 'error-warning-line',
        },
      },
      {
        path: '404',
        name: 'Error404',
        component: () => import('@/views/system/404'),
        meta: {
          title: '404',
          icon: 'error-warning-line',
        },
      },
    ],
  },
]

const vab = [
  {
    path: '/vab',
    component: Layout,
    redirect: '/vab/table',
    alwaysShow: true,
    meta: {
      title: '组件',
      icon: 'apps-line',
    },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/system/vab/table'),
        meta: {
          title: '表格',
          icon: 'table-2',
        },
      },
      {
        path: 'icon',
        name: 'Icon',
        component: () => import('@/views/system/vab/icon'),
        meta: {
          title: '图标',
          icon: 'remixicon-line',
        },
      },
    ],
  },
]

export default [...hone, ...error, ...vab]
