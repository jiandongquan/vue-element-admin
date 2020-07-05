
// 本模块用于管理应用级的状态信息；

import Cookies from 'js-cookie'

// sidebar: 用于控制侧边栏是否全部展开；
// device: 用于控制当前显示模式，默认为：desktop-桌面浏览器模式
// size：用于控制element-ui 组件的显示大小，默认值为：medium-中等；
const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium'
}

// 同步方式修改状态值
const mutations = {
  // 转换侧边栏显示状态
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  // 关闭侧边栏
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  // 转换系统显示设备
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  // 设置element-ui组件显示大小
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  }
}
// 异步方式改变状态值
const actions = {
  // 转换侧边栏状态
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  // 关闭侧边栏
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  // 转换系统显示设备
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  // 设置element-ui组件显示大小
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
