import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  // 主题状态值
  theme: variables.theme,
  // 显示配置按钮状态值
  showSettings: showSettings,
  // 显示tagsview状态值
  tagsView: tagsView,
  // 固定标题栏状态值
  fixedHeader: fixedHeader,
  // 显示侧边栏logo状态值
  sidebarLogo: sidebarLogo
}

// 同步方式设置状态值
const mutations = {
  // 更改设置
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
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

