## 本项目技术栈
* vue
* node
* git
* vuex
* vue-router
* vue-cli
* axios
* sass
* rem
* element-ui

## 功能

```
- 登录 / 退出

- 权限验证
 - 鉴权
 - 权限管理
 - 商品的增删改查
 - socket通信生成订单
 - 用户管理


- 組件
  - 图片上传
  - 分页
  - 编辑、删除

```

## 开发

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-element-admin.git

# 进入项目目录
cd vue-element-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev 或者 npm start
```

浏览器访问 http://localhost:8006

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```



## 其他

## router里面的index.js
* 删了多余的组件路由


## 请求响应拦截（request）
* 改了里面存放token的方式
* config.headers['Authorization'] = localStorage.getItem('token')
* 不需要缓存token，删了


## .env.development
* 改了服务器代理
* VUE_APP_BASE_API = '/api/v1'
*  proxy:{//代理模式
         '/api':{
            target:'http://localhost:4444'//自己的服务器
         }
    }

##  在store状态管理中设置
* localStorage.serItem('token')//登录的时候把token存储到本地存储


##  登录实现步骤
* 1. login组件中，通过handleLogin控制点击登录，从而利用dispatch方法走一遍状态管理。

* 2. 进入store中user.js的action方法，通过action里面的login函数传入用户表单数据，从api/user.js中调用login方法向数据库请求用户数据，返回一个token值，再通过mutation方法将token写入state保存下来，最后调用api/auth.js中的setToken方法将Token写入cookie。

* 3. views/permission.js中的router.beforeEach方法（路由守卫）用来拦截进入页面的请求，在这个方法中，使用了api/auth.js中的getToken方法，从cookie中获取token值，且在后面的try方法中调用了store/user.js中action方法里的getInfo方法。

* 4. 此getInfo方法调用api/user.js中的getInfo方法，传入token值后，从后端获取用户相关信息，并进行一系列判断（此处一定要返回和规定的数据格式一样的数据{ roles, name, avatar, introduction }）从而通过路由守卫进行判断身份，通过登录。


## WebSocket
* 长连接，一旦连接就不会断开
* socket.io  第三方框架库，解决兼容等问题



## socket
### socket初始化及发送接收数据
```
// 一旦安装了Socket.IO服务器库，就可以初始化服务器了
const httpServer = require("http").createServer();//去socket官网复制过来的
const io = require("socket.io")(httpServer, {
  // 跨域问题处理
});

//有人连接我时触发
io.on("connection", (socket) => {
    console.log('有人连接我成功了')
    io.emit('server','你好，服务端')
    //接收数据时一定要放在里面,而且用socket监听
    socket.on('data',msg=>{
        console.log('接收服务端发送过来的消息',msg)
    })
});

httpServer.listen(3000, ()=>{
    console.log('启动一台socket服务')
});

```
### 其他服务器使用socket的方式
* var io=require('socket.io-client')  //导入socket
* var socket=io('http://localhost:3000')//socket服务器地址
```
//共用的
socket.on('connect',()=>{  
    console.log('我连接上socket了')
})
//接收
socket.on('server',msg=>{// server跟socket的io.emit发送的事件相对应
    console.log('我接收到socket发来的消息',msg)
})
//发送
socket.emit('data','你好，socket')  
module.exports=socket

```

### 接口
* 所有的请求数据都在src/api
```
   import request from '@/utils/request'

    //登录
   export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
    }

    export default{  login  }

```
* 挂载到main.js中
* 使用：this.$api.方法名()

### 请求拦截
### 存放token
* config.headers['Authorization'] = localStorage.getItem('token')// 在请求拦截里存放token

### 设置端口和代理模式
#### vue.config
* const port = process.env.port || process.env.npm_config_port || 8006 // 管理系统端口
* module.exports = {
*  devServer:{
*  port:port,//端口
*  open: true,//页面自动打开
*  proxy: { // 代理模式
*      '/api': {
*        target: 'http://localhost:4444', // 自己的服务器
*       changeOrigin: true
*     }
*    }
* }


## 封装组件注意的问题
* v-model="fom"
*  props:{
        value:{
            type:String,
            default:'',
        }
    }
*  //解决表单初始值没显示的问题
        fom:{
            get(){
                return this.cate=this.value
            },
            set(val){
                this.cate=val
            }
*       }
*  watch:{
        cate(){//监听品类的变化
            this.$emit('input',this.cate)//触发父组件用v-model的input事件
            this.$emit('change')//下拉子组件触发的事件，一定要添加，不然传不过去
        }
*   }

## 所有state缓存都存放在Getters中
* import { mapGetters } from 'vuex'
* ...mapGetters(['cateArr'])


## 路由配置(有权限的路由)
### 角色
* 用户管理  -- roles: ['admin']
* username：shop   password：123456

* 商家管理  -- roles: ['yeshao']
* username：admin   password：123456

### 多个路由共用一个组件
* 通过路由后面判断有没有加id
* from/:id --新增
* from/    --编辑


## store(缓存)
```
const state={
    cateArr:[]
}

const mutations={
    UPDATE_CATES: (state, payload) => {
        state.cateArr = payload
      }
}

const actions={
    getFindmenu({ commit }) {
        // 调接口
        return new Promise((resolve, reject)=>{
            findmenu().then(res => {
            commit('UPDATE_CATES', res.data)
            resolve()
          })
        })
      }
}

export default{
    namespaced:true,
    state,
    mutations,
    actions
}

```

## utils ( 工具库 )
### auth.js (增删改查token)
```
import Cookies from 'js-cookie' 导入插件
const TokenKey = 'Admin-Token'

Cookies.get(TokenKey) // 获取token

Cookies.set(TokenKey, token) // 设置token

Cookies.remove(TokenKey) // 删除token

```
### config.js ( 配置baseURL )
* serBase="http://localhost:4444"//自己的服务器

* baseURL="http://localhost:8006"//管理后台地址

* beseImg="http://localhost:8006/api/v1/upload/img"//存储到服务器的public里的nds

* socketURL='http://localhost:3000'//socket服务器地址

### request,js ( 请求响应拦截 ) 
```
 const process = 'http://localhost:8006'//自己的IP地址
 const VUE_APP_BASE_API= '/api/v1'//已经设置好代理模式，只要访问到/api就跳转到指定的服务器请求数据
 const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // 当跨域请求时发送cookie
    timeout: 5000 // request timeout
})

config.headers['Authorization'] = localStorage.getItem('token')// 存放token

```

### moment ( 时间转换格式 )
```
import moment from 'moment'

//data：要转换的时间搓    format:转换成什么格式
function timeRepalce(date,format){ 
    return moment(date).format(format)
}

export default{
    timeRepalce
}
```


## views ( 组件集合 )



## main.js ( 入口文件 )







