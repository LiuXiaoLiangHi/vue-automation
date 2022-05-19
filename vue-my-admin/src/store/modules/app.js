/**
 * app模块存储的是一些系统方面的设置
 */
import Cookies from 'js-cookie'

const state = {
  //侧边栏
  sidebar: {
    // 是否折叠
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    // ???
    withoutAnimation: false
  },
  // 当前设备 ：pc桌面
  device: 'desktop',
  // 大小，----从cookies中获取大小 || 中等大小
  size: Cookies.get('size') || 'medium'
}

const mutations = {
  // 切换左侧导航栏是否折叠
  TOGGLE_SIDEBAR: state => {
    console.log('------点击了折叠按钮---mutations-----')
    // 开关取反
    state.sidebar.opened = !state.sidebar.opened
    // ???
    state.sidebar.withoutAnimation = false
    // 如果是打开的状态
    if (state.sidebar.opened) {
      // 在cookies中设置侧边栏的状态为1 ----（1为打开，0为折叠）
      Cookies.set('sidebarStatus', 1)
    } else {
      // 折叠状态
      Cookies.set('sidebarStatus', 0)
    }
  },
  //关闭侧边栏
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    console.log('------关闭侧边栏---mutations-----')
    // cookies设置侧边栏状态为折叠
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  // 切换设备
  TOGGLE_DEVICE: (state, device) => {
    console.log('------切换了设备---mutations-----')
    state.device = device
  },
  // 设置大小
  SET_SIZE: (state, size) => {
    console.log('------设置了大小---mutations-----')
    state.size = size
    // cookies也设置大小
    Cookies.set('size', size)
  }
}

const actions = {
  // 切换侧边栏
  toggleSideBar({ commit }) {
    console.log('------commit切换侧边栏---actions-----')
    commit('TOGGLE_SIDEBAR')
  },
  // 关闭侧边栏
  closeSideBar({ commit }, { withoutAnimation }) {
    console.log('------commit关闭侧边栏---actions-----')
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  // 切换设备
  toggleDevice({ commit }, device) {
    console.log('------commit切换了设备---actions-----')
    commit('TOGGLE_DEVICE', device)
  },
  // 设置大小
  setSize({ commit }, size) {
    console.log('------commit设置大小---actions-----')
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
