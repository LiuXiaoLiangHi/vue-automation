/**
 *  所有异步路由的被加载的入口
 *  目前有六个
 */
import icon from './modules/icon'
import chartsRouter from './modules/charts'
import nestedRouter from './modules/nested'
import tab from './modules/tab'
import clipboard  from './modules/clipboard'
import draggable from './modules/draggable'
import myvideo from './modules/video'

export const asyncRoutes = [
    icon,
    chartsRouter,
    nestedRouter,
    tab,
    clipboard,
    draggable,
    myvideo,
    // 404必须放到最后
    { path: '*', redirect: '/404', hidden: true }
  ]
  