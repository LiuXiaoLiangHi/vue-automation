/**
 * 该文件是错误日志设置
 */
const state = {
  logs: []
}

const mutations = {
  // 添加错误日志
  ADD_ERROR_LOG: (state, log) => {
    console.log('------添加错误日志---mutations-----')
    state.logs.push(log)
  },
  //清除错误日志
  CLEAR_ERROR_LOG: (state) => {
    console.log('------清除错误日志---mutations-----')

    state.logs.splice(0)
  }
}

const actions = {
  // 添加错误日志
  addErrorLog({ commit }, log) {
    console.log('------commit添加错误日志志---mutations-----')

    commit('ADD_ERROR_LOG', log)
  },
  // 清除错误日志
  clearErrorLog({ commit }) {
    console.log('------commit清除错误日志---mutations-----')

    commit('CLEAR_ERROR_LOG')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
