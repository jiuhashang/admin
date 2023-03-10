import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

// 图片预览
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

import '@/styles/index.scss' // global css
import glComponents from './utils/global-components' // 引入全局组件
import glFilters from './utils/global-filters' // 引入全局filters
import glDirectives from './utils/global-directives'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale, size: 'small' })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(VueViewer)
Vue.use(glComponents) // 注册全局组件
Vue.use(glFilters) // 注册全局filters
Vue.use(glDirectives)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
