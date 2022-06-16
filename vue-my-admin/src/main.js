import Vue from 'vue'

import Cookies from 'js-cookie' // 引入cook

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'


import '@/styles/index.scss' // 公用的样式

import App from './App'
import store from './store'
import router from './router'

import './icons' //  全局注册icon组件
import './permission' //  权限认证
import './utils/error-log' // error log
import '@/components/UndevelopedFeatures/index.js' // 全局注册功能未开发弹窗组件
import axiosInstance from '@/config/httpConfig.js'

import * as filters from './filters' // 引入全局过滤器


Vue.prototype.$http = axiosInstance


Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// 注册全局过滤器
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
 
