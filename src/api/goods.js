import request from '@/utils/request'

// 入参：{size,page,cate,hot}
// 首页商品列表
export function homeList(params) {
  return request({
    url: '/good/list',
    method: 'get',
    params
  })
}

//获取商品品类
export function findmenu(params){
  return request({
    url:'/good/cates',
    method:'GET',
    params:params||{}
  })
}

//删除商品
export function deleGoos(data){
  return request({
    url:'/good/del',
    method:'POST',
    data
  })
}

//创建商品
export function addGoos(data){
  return request({
    url:'/good/add',
    method:'POST',
    data
  })
}

//编辑商品
export function editGoos(params){

  return request({
    url:'/good/detail',
    method:'GET',
    params
  })
}


//新增banner
export function addbanner(data){

  return request({
    url:'/good/addr',
    method:'POST',
    data
  })
}

//获取banner
export function findbanner(params){
  return request({
    url:'/good/list2',
    method:'GET',
    params:params||{}
  })
}

export default {
  homeList,
  findmenu,
  deleGoos,
  addGoos,
  editGoos,
  addbanner,
  findbanner
}
