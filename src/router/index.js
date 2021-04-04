import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect', // 重定向
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',//根路径
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
]

//这些页面都是有权限的
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // 总是会显示根菜单吗
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // 可以在根导航中设置角色
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // 或者你只能在子导航中设置角色
        }
      }
    ]
  },

  //商家管理
  {
    path: '/goods',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // 总是会显示根菜单吗
    name: '商品管理',
    meta: {
      title: '商品管理',
      icon: 'lock',//图标
      roles: ['yeshao'] // 可以在根导航中设置角色
    },
    children: [
      // 商品列表
      {
        path: 'list',//子组件不用加 '/'
        component: () => import('@/views/goods/Gs-list'),
        name: '商品列表',
        meta: {
          title: '商品列表',
          roles: ['yeshao'] // 或者你只能在子导航中设置角色
        }
      },

      // form表单
      {//新增
        path: 'from/:id',//子组件不用加 '/'
        component: () => import('@/views/goods/Gs-From'),
        name: '商品编辑',
        meta: {
          title: '商品编辑',
          roles: ['yeshao'] // 或者你只能在子导航中设置角色
        }
      },
      {//编辑
        path: 'from/',//子组件不用加 '/'
        component: () => import('@/views/goods/Gs-From'),
        name: '商品新增',
        meta: {
          title: '商品新增',
          roles: ['yeshao'] // 或者你只能在子导航中设置角色
        }
      },
       {//订单
        path: 'order',
        component: () => import('@/views/goods/Gs-Order'),
        name: '商品订单',
        meta: {
          title: '商品订单',
          roles: ['yeshao'] // 或者你只能在子导航中设置角色
        }
      }
    ]
  },
    {
    path: '/adve',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // 总是会显示根菜单吗
    name: '广告中心',
    meta: {
      title: '广告中心',
      icon: 'lock',//图标
      roles: ['yeshao'] // 可以在根导航中设置角色
    },
    children: [
      // 广告列表
      {
        path: 'list',//子组件不用加 '/'
        component: () => import('@/views/adve/List'),
        name: '广告列表',
        meta: {
          title: '广告列表',
          roles: ['yeshao'] // 或者你只能在子导航中设置角色
        }
      },

      // form表单
      {//新增
        path: 'from',//子组件不用加 '/'
        component: () => import('@/views/adve/From'),
        name: '广告新增',
        meta: {
          title: '广告新增',
          roles: ['yeshao'] // 或者你只能在子导航中设置角色
        }
      },
    ]
  },

  //超级管理员
  {
    path: '/superAdmin',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: '超级管理员',
    meta: {
      title: '超级管理员',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      // 用户管理
      {
        path: 'user',//子组件不用加 '/'
        component: () => import('@/views/superAdmin/User'),
        name: '用户管理',
        meta: {
          title: '用户管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
