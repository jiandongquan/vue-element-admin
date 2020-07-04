
// 通过Store的getters模式（缓冲模式）导出store中保存状态信息
const getters = {
  // 侧边栏显示状态（保存在cookies中，以便用户不需要每次打开应用时，都需要进行设置）
  sidebar: state => state.app.sidebar,

  // element-ui组件的大小（保存在cookies中，以便用户不需要每次打开应用时，都需要进行设置）
  size: state => state.app.size,

  // 设备信息（默认值为：desktop），（保存在cookies中，以便用户不需要每次打开应用时都进行判断）
  device: state => state.app.device,

  // 用户访问过的页面
  visitedViews: state => state.tagsView.visitedViews,

  // 已缓存的页面（
  cachedViews: state => state.tagsView.cachedViews,

  // 用户的token
  token: state => state.user.token,

  // 用户的替身（来源于第三方的用户标识）
  avatar: state => state.user.avatar,

  // 用户账号
  account: state => state.user.account,

  // 用户简介
  introduction: state => state.user.introduction,

  // 用户角色
  roles: state => state.user.roles,

  // 用户已授权路由
  permission_routes: state => state.permission.routes,

  // 错误日志
  errorLogs: state => state.errorLog.logs
}
export default getters
