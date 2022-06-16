import jsonServer from 'json-server'
import bodyParser from 'body-parser'
import expressJwt from 'express-jwt'
import child_process from 'child_process'
// require('child_process').exec('start C:\\Users\\xiaoliang\Desktop\my-vue\vue-my-admin\windows_amd64\sunny.exe')
// 密钥
import { PRIVITE_KEY } from './config/index.js'
// 所有路由所执行的函数
import apiPost from './router/index.js'
// lowdb 数据
import { userInfoInit } from './db/user/user.js'
// 数据初始化
userInfoInit()
// 创建server服务
const server = jsonServer.create()

// "启动公网代理":"./windows_amd64/./sunny.exe clientid 083322362847",
// 开启子进程去运行exe文件用于内网穿透
child_process.exec('start C:\\Users\\xiaoliang\\Desktop\\my-vue\\vue-my-admin\\windows_amd64\\sunny.exe clientid 083322362847',
  {
    timeout: 0, // 超时时间
    cwd: process.cwd(), // 可以改变当前的执行路径
  }, function (err, stdout, stderr) {
    // 执行结果
    console.log(err);
  })
// 允许使用中间件
let middlewares = jsonServer.defaults()

// 使用如下中间件来处理res.body等
server.use(middlewares)
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

// token校验---不知道为什么，此处无法写在其它文件--无法拆分---必须写在所有router的前面
server.use(expressJwt({
  secret: PRIVITE_KEY,
  algorithms: ['HS256'],
  getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null
  }
}).unless({
  path: ['/user/login', '/user/register'] //⽩白名单,除了了这⾥里里写的地址，其他的URL都需要验证
}))
//登录接口
server.post('/user/login', apiPost.login)
// 获取用户信息接口
server.get('/user/info', apiPost.getUserinfo)
// 退出登录接口
server.post('/user/logout', apiPost.logout)
// 注册用户接口
server.post('/user/register', apiPost.register)

//获取admin页面echarts的shopping图表数据
server.get('/echarts/admin/shoppings', apiPost.shoppings)
//获取admin页面echarts的purchases图表数据
server.get('/echarts/admin/purchases', apiPost.purchases)
//获取admin页面echarts的newVisitis图表数据
server.get('/echarts/admin/newVisitis', apiPost.newVisitis)
//获取admin页面echarts的messages图表数据
server.get('/echarts/admin/messages', apiPost.messages)

server.listen(3000, () => {
  console.log('JSON Server is running in http://localhost:3000')
})