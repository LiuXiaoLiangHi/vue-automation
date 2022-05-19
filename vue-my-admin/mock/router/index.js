import jsonServer from 'json-server'

import { login } from './user/login.js'
import { getUserinfo } from './user/getUserInfo.js'
import { logout } from './user/logout.js'
import { register } from './user/register.js'

import {shoppings} from './echarts/shoppings.js'
import {purchases} from './echarts/purchases.js'
import {newVisitis} from './echarts/newVisitis.js'
import {messages} from './echarts/messages.js'


 const router = jsonServer.router()

//登录接口
router.post('/user/login', login)
// 获取用户信息接口
router.get('/user/info', getUserinfo)
// 退出登录接口
router.post('/user/logout', logout)
// 注册用户接口
router.post('/user/register', register)

//获取admin页面echarts的shopping图表数据
router.get('/echarts/admin/shoppings',shoppings)
//获取admin页面echarts的purchases图表数据
router.get('/echarts/admin/purchases',purchases)
//获取admin页面echarts的newVisitis图表数据
router.get('/echarts/admin/newVisitis',newVisitis)
//获取admin页面echarts的messages图表数据
router.get('/echarts/admin/messages',messages)

export default {
    router
}