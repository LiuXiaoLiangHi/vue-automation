import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
// https://blog.csdn.net/QiuRenBB/article/details/123126612
const modulesFiles = require.context('./modules', true, /\.js$/)

//你不需要' import app from ./modules/app
//它将自动从模块文件中要求所有vex模块
const modules =
  modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
  }, {})

  
const store = new Vuex.Store({
  modules,
  getters
})

 
export default store
