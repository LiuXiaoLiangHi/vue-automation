/**
 * 固定的路由，所有角色都具备的路由
 * 目前有八个
 */
import Layout from '@/layout/index.vue'
export const constantRoutes = [
  {
    // 重定向页面,用于例如重新设置大小，然后重定向到之前访问的页面
    path: '/redirect',
    component: Layout,
    hidden: true, // 是否隐藏
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    // 登录页
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true //不会在sidebar出现
  },
  {
    // 注册页
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true //不会在sidebar出现
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true //不会在sidebar出现
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true //不会在sidebar出现
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard', //重定向到首页
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
     
      meta: {
        title: '首页',
        icon: 'dashboard', // 左侧导航栏的icon
        affix: true //是否固定 tabs
      }
    }]
  },
  {
    // 文档页面
    path: '/documentation',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/documentation/index'),
      name: 'Documentation',
      meta: {
        title: 'api文档',
        icon: 'documentation',
        affix: true //是否固定 tabs
      }
    }]
  },
  {
    // 个人中心
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [{
      path: 'index',
      component: () => import('@/views/profile/index'),
      name: 'Profile',
      meta: {
        title: '个人中心',
        icon: 'user',
        noCache: true // 是否被 <keep-alive> 缓存
      }
    }]
  }
]
