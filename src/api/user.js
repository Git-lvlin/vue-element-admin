import request from '@/utils/request'

//登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 用token换取用户信息（用户名、头像、手机号、角色信息、菜单信息）
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

//退出登录
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

//添加用户信息
//POST URL：/role/userAdd
//入参：{ username, role }
export function userAdd(data){
  return request({
    url:'/role/userAdd',
    method:'post',
    data
  })
}

//获取用户信息
//GET URL：/role/userList
export function AcquireUser(params){
  return request({
    url:'/role/userList',
    method:'get',
    params
  })
}

//获取角色信息
//GET URL：/role/adminList
export function AcquireAdmin(params){
  return request({
    url:'/role/adminList',
    method:'get',
    params
  })
}

//获取订单信息
//GET URL：/user/order
// export function acquireOrder(params){
//   return request({
//     url:'/user/order',
//     method:'GET',
//     params
//   })
// }

export default{
    login,
    getInfo,
    logout,
    userAdd,
    AcquireUser,
    AcquireAdmin,
    // acquireOrder
}