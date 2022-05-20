/**
 * 该文件是所有路由请求的入口-import了所有的请求接口所执行的函数
 * 并将这些函数一起打包出去-方便目录清晰
 */
import { login } from './user/login.js'
import { getUserinfo } from './user/getUserInfo.js'
import { logout } from './user/logout.js'
import { register } from './user/register.js'

import { shoppings } from './echarts/shoppings.js'
import { purchases } from './echarts/purchases.js'
import { newVisitis } from './echarts/newVisitis.js'
import { messages } from './echarts/messages.js'

export default {
  login, getUserinfo, logout, register,
  shoppings, purchases, newVisitis, messages
}

 
 



