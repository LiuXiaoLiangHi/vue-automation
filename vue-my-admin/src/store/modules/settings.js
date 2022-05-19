/**
 *  该文件储存的是更改系统主题方面的设置
 */
import variables from '@/styles/element-variables.scss' //引入
import defaultSettings from '@/settings' // 引入默认的设置

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  // 主题
  theme: variables.theme,
  // 是否显示设置的右面板
  showSettings: showSettings,
  // 是否需要 tagsView
  tagsView: tagsView,
  // 是否固定头部信息
  fixedHeader: fixedHeader,
  //是否展示login在侧边栏
  sidebarLogo: sidebarLogo,
  //抽屉是否打开
  is_show_drawer:false
}

const mutations = {
  //改变设置
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  // 改变设置
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

