import Vue from 'vue'

import Cookies from 'js-cookie' // 引入Cookie插件

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui' // 引入element-ui库
import './styles/element-variables.scss'
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // 支持scss

import App from './App'
import store from './store' // 状态管理
import router from './router' 

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import api from '@/api/index.js'//导入api
Vue.prototype.$api=api//挂载到vue原型上

import time from '@/utils/moment.js'//导入时间转换
Vue.prototype.$time=time

import config from "@/utils/config.js" //导入服务器地址和自己的ip地址
Vue.prototype.$config=config 

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock') //mock请求接口数据
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
// Object.keys(filters).for(key => {
//   Vue.filter(key, filters[key])
// })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
