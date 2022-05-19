/**
 * 该文件储存的是用户的信息
 * */
import { fetchLogin, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  // 用户的token
  token: getToken(),
  //用户名
  name: '',
  // 头像
  avatar: '',
  // 介绍
  introduction: '',
  // 角色--管理员or游客
  roles: []
}

const mutations = {
  // 设置token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  //设置介绍信息
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  // 设置用户名
  SET_NAME: (state, name) => {
    state.name = name
  },
  // 设置头像
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  //设置角色
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  //登录
  login({ commit }, userInfo) {
    // 从userInfo中获取用户名和密码
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 发送axios请求login
      fetchLogin({ username: username, password: password }).then(response => {
        // 从响应中获取data
        const { data } = response
        // 将响应中的token设置到state
        commit('SET_TOKEN', data.token)
        // cookies中设置token
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  //  得到用户的信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 发送axios请求getInf获取用户信息
      getInfo().then(response => {
        // 获取响应的data
        const { data } = response

        if (!data) {
          reject('验证失败，请重新登录')
        }
        // 从data中获取用户的角色，用户名，头像，介绍
        const { roles, name, avatar, introduction } = data

        //  roles必须是一个非空数组
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        // 将得到的信息设置到state
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  //退出登录
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // 发送axios请求logout
      logout(state.token).then(() => {
        // 清除token和roles为初始值
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        //移除cookies中的token
        removeToken()
        // 重置路由
        resetRouter()

        // （删除）重置访问过的视图和缓存的视图
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  //重置token和roles
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      // cookies移除token
      removeToken()
      resolve()
    })
  },

  // 动态地修改权限
  async changeRoles({ commit, dispatch }, role) {

    const token = role + '-token'
   // 将新的token设置到state
    commit('SET_TOKEN', token)
    // 将新的token设置到cookies
    setToken(token)
    // 重新获取用户的信息---解构得到角色
    const { roles } = await dispatch('getInfo')
    // 重置路由
    resetRouter()

    // 根据角色生成可访问的路由图
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    //  动态添加生成的路由
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    // 重置可见视图和隐藏视图
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
