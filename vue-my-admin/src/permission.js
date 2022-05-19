import router from './router'
import store from './store'

import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条插件
import 'nprogress/nprogress.css' //  进度条的样式

import { getToken } from '@/utils/auth' // get token from cookie

import getPageTitle from '@/utils/get-page-title' // 得到网页的title

NProgress.configure({ showSpinner: false }) // NProgress Configuration
// 白名单
const whiteList = ['/login', '/auth-redirect','/register'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {

  // console.log('--------前置路由----进度条开始加载')
  NProgress.start()

  // 设置文档 title
  document.title = getPageTitle(to.meta.title)
  // console.log('开始设置文档title', document.title)


  // 判断用户是否已经登录
  console.log('开始判断是否登录')
  const hasToken = getToken()
  console.log('---hasToken---',hasToken)
  if (hasToken) {
    // 如果有token信息
    console.log('有token信息---开始执行下一步')
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({ path: '/' })
      // 结束进度条
      NProgress.done()
      console.log('去的是登录页面----重定向到首页----结束进度条')
    } else {
      console.log('去的不是登陆页面--开始是否获取了权限角色----hasRoles')

      // 去的页面不是登录页面
      // 通过getInfo判断用户是否获得了权限角色---判断store中是否有roles
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      console.log('-----hasRoles----',hasRoles)
      if (hasRoles) {
        // 如果store中有角色
        next()
      } else {
        // 如果store中没有角色
        try {
          // get user info
          // 注意:角色必须是一个对象数组!例如:['admin']或['developer'，'editor']
          const { roles } = await store.dispatch('user/getInfo')

          // 生成基于角色的可访问路由图
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 动态添加到路由内
          router.addRoutes(accessRoutes)

          //hack方法，以确保地址是完整的
          //设置replace: true，这样导航将不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 移除token,重定向到登录页面
          await store.dispatch('user/resetToken')
          // message 提示错误
          Message.error(error || 'Has Error')
          // 跳转到登录页面
          next(`/login?redirect=${to.path}`)
          // 结束进度条
          NProgress.done()
        }
      }
    }
  } else {
    // 没有token的情况
    console.log('没有token')
    if (whiteList.indexOf(to.path) !== -1) {
      //  在白名单内
      console.log('在白名单内')
      next()
    } else {
      // 其他没有访问权限的页面被重定向到登录页面
      next(`/login?redirect=${to.path}`)
      // 结束进度条
      console.log('重定向到登录页面进行登录')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 结束进度条
  NProgress.done()
})
