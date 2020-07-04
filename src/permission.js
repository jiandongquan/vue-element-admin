/**
 * @description 通过路由系统进行系统全局权限控制
 */

import router from './router'
// 引用进行系统处理后的vuex
import store from './store'
// 引用element-ui的message组件
import { Message } from 'element-ui'
// 引用进度条组件
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

// 引用获取Token函数
import { getToken } from '@/utils/auth' // get token from cookie
// 引用获取页面标题函数
import getPageTitle from '@/utils/get-page-title'

// 对进度条进行配置：
NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 设置不进行重定向的组件白名单；
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

// 对所有路由切换前进行判断；
router.beforeEach(async(to, from, next) => {
  // 开始进度条
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 获取用户token
  const hasToken = getToken()

  // 根据用户token判断用户是否已经登录
  if (hasToken) {
    if (to.path === '/login') { // 如果用户已经登陆并且将有路由的页面为登陆页面，则则将用户重定向到主页；
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else { // 如果非登陆页面，则进行以下操作：
      // 判断用户是否已经通过getInfo获得用户相关的角色信息；
      // 因此路由是根据用户角色动态加载的，所以，有用户角色信息，则表示有相关的路由权限；
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // 如果存在用户相关的角色信息，则路由到用户选择的页面
      if (hasRoles) {
        next()
      } else { // 用户角色不存在，则获取用户信息，用户角色及其对应的路由信息，并动态加入路由中；
        try {
          // 获取用户信息
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          // 根据用户角色，生成路由映射表
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 动态加载用户可以访问的路由列表
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // 上述获取用户信息，用户角色及其对应路由信息，动态加载路由的过程中出现错误，则清除token，并要求用户重新登陆；
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 如果用户没有token，则表示用户未登陆，则：

    // 如果将有路由的页面为免登陆页面，则进行路由；
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // 如果页面非免登陆页面，则重定向到用户登陆页面，让用户进行登录系统处理；
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
