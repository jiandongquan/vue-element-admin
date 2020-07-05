// 本模块用于管理应用的错误日志状态信息（保存到logs数组中）
const state = {
  logs: []
}

// 同步方式操作日志信息；
const mutations = {
  // 增加错误日志记录
  ADD_ERROR_LOG: (state, log) => {
    state.logs.push(log)
  },
  // 清除日志记录
  CLEAR_ERROR_LOG: (state) => {
    state.logs.splice(0)
  }
}

// 异步方式操作错误日志信息；
const actions = {
  // 增加错误日志记录
  addErrorLog({ commit }, log) {
    commit('ADD_ERROR_LOG', log)
  },
  // 清除错误日志记录
  clearErrorLog({ commit }) {
    commit('CLEAR_ERROR_LOG')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
