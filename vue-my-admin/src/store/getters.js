const getters = {
  // 侧边栏信息对象
  sidebar: state => state.app.sidebar,
  // 大小
  size: state => state.app.size,
  // 当前设备
  device: state => state.app.device,
  // 可访问视图
  visitedViews: state => state.tagsView.visitedViews,
  // 隐藏视图
  cachedViews: state => state.tagsView.cachedViews,
  // 用户token
  token: state => state.user.token,
  //用户头像
  avatar: state => state.user.avatar,
  // 用户名
  name: state => state.user.name,
  // 用户的介绍
  introduction: state => state.user.introduction,
  // 用户的角色
  roles: state => state.user.roles,
  // 用户的路由
  permission_routes: state => state.permission.routes,
  // 错误日志
  errorLogs: state => state.errorLog.logs
}
export default getters
