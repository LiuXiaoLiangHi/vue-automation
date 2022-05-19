import Vue from 'vue'
import Router from 'vue-router'
import {constantRoutes} from '../router/constantRoutes.js'
Vue.use(Router)

/**
 * @description:创建路由对象
 * @param {*}
 * @return {*}
 */
const createRouter = () => new Router({
  // mode: 'history', // require service support
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

const router = createRouter()
export default router
