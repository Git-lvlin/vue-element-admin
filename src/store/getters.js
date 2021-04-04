const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,//token
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,//角色
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  cateArr:state => state.good.cateArr //品类
}
export default getters 
