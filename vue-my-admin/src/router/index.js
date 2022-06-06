/**
 * 路由的入口文件
 * @since constantRoutes 默认路由
 */
import Vue from 'vue'
import Router from 'vue-router'
import {constantRoutes} from '../router/constantRoutes.js'

Vue.use(Router)

//start 解决vue-router重复定向报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/**
 * @description:创建路由对象
 * @param {*}
 * @return {*}
 */
const createRouter = () => new Router({
  // 默认为hash模式
  // mode: 'history', 
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
/**
 * @description: 重置路由对象
 * @param {*}
 * @return {*}
 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
/**@description 路由对象 */
const router = createRouter()

export default router
