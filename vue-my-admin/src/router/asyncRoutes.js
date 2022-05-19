/**
 *  所有异步路由的被加载的入口
 * 
 */
import icon from './modules/icon'
import chartsRouter from './modules/charts'
import nestedRouter from './modules/nested'
import tab from './modules/tab'
import clipboard  from './modules/clipboard'
export const asyncRoutes = [
    icon,
    chartsRouter,
    nestedRouter,
    tab,
    clipboard,
    // 404必须放到最后
    { path: '*', redirect: '/404', hidden: true }
  ]
  