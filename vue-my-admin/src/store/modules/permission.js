/**
 * 该文件存储的是用户权限方面的信息--例如路由权限
 * @since asyncRoutes ：异步路由
 * @since constantRoutes 默认路由
 */

import {
  asyncRoutes
} from '@/router/asyncRoutes.js'
import {
  constantRoutes
} from '@/router/constantRoutes.js'


/**
 * @description: 判断当前角色是否有权访问传入的路由
 * @param {*} roles --当前角色
 * @param {*} route  -- 需要判断的路由
 * @return {Boolean} true | false 当前页面是否可以被访问
 */
function hasPermission(roles, route) {
  //如果meta中有roles信息
  if (route.meta && route.meta.roles) {
    // 如果meta中的roles信息可以访问则返回true
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    //没有meta，所有roles都可以访问
    return true
  }
}


/**
 * @description: 过滤异步路由
 * @param {*} routes  asyncRoutes
 * @param {*} roles 角色
 * @return {*} 过滤后的路由
 */
export function filterAsyncRoutes(routes, roles) {

  const res = []

  routes.forEach(route => {
    const tmp = {
      ...route
    }
    // console.log('判断当前用户是否具有权限')
    if (hasPermission(roles, tmp)) {
      // console.log('当前页面有权被访问')
      // 如果当前路由有子路由
      if (tmp.children) {
        // 判断子路由有没有权限访问
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  // 当前用户可访问的路由（过滤后的异步路由加上默认）
  routes: [],
  // 过滤后的异步路由
  addRoutes: []
}

const mutations = {
  // 设置路由
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {

  generateRoutes({ commit }, roles) {
    // console.log('开始生成路由----roles是', roles)
    return new Promise(resolve => {
      //可访问路由
      let accessedRoutes
      //判断角色是不是admin
      if (roles.includes('admin')) {
        // console.log('是admin---可以访问所有路由')
        //是admin就可以访问所有需要判断的路由
        accessedRoutes = asyncRoutes || []
      } else {
        // console.log('不是admin,----开始过滤路由')
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        // console.log('-----accessedRoutes----', accessedRoutes)
      }
      // console.log('-----commit设置当前用户可访问的路由------')
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}