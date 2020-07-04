// 导入Vue
import Vue from 'vue'

// 导入专门用于做cookie处理的cookies库
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

// 导入element-ui库
import Element from 'element-ui'
import './styles/element-variables.scss'

// 如果使用中文语言包请默认支持，无需额外引入，请删除以下依赖
// import enLang from 'element-ui/lib/locale/lang/en'

// 全局css设置
import '@/styles/index.scss'

// 导入App组件
import App from './App'

// 导入定制后的vuex组件
import store from './store'
// 导入定制后的vue-路由组件
import router from './router'

// 导入图标
import './icons'
// 导入权限控制
import './permission'

// 导入错误日志
import './utils/error-log'

// 导入全局过滤器
import * as filters from './filters'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// 加载element-ui
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // 设置element-ui的默认大小
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// 注册全局过滤器应用
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
