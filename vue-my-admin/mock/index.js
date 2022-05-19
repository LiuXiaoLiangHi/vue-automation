/**
 * @description:该文件是json-server的入口文件
 * 引入的模块如下
 */

import jsonServer from 'json-server'
import expressJwt from 'express-jwt'
import bodyParser from 'body-parser'
import Mock from 'mockjs'


// 密钥
import { PRIVITE_KEY } from './config/index.js'
//适配器
import { userInfoInit } from './db/user/user.js'
// import { param2Obj } from './utils/index.js'
import { readUserInfoToLogin, getUserInfo } from './db/user/changeUserInfo.js'
import { registerUser } from './db/user/changeUserInfo.js'
// 数据初始化
userInfoInit()
const server = jsonServer.create()
// 允许使用中间件
let middlewares = jsonServer.defaults()

// 使用如下中间件来处理res.body等
server.use(middlewares)
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
// token校验
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

server.post('/user/login', async (req, res) => {
  // 从请求体中获取用户名和密码
  const { username, password } = req.body;
  // 调用对应的方法去获取结果
  let result = await readUserInfoToLogin(username, password)
  res.send(result)

})
// 获取用户信息
server.get('/user/info', async (req, res) => {
  const { userName } = req.user
  let result = await getUserInfo(userName)
  res.send(result)
}
)
//退出登录
server.post('/user/logout', (req, res) => {
  res.send({
    code: 20000,
    msg: '退出成功'
  })
})
// 注册
server.post('/user/register', async (req, res) => {
  const { userName, userPhoneNumber, userPassword } = req.body
  // console.log(req.body);
  let result = await registerUser(userName, userPassword, userPhoneNumber)
  res.send(result)
})

server.get('/echarts/admin/shoppings', (req, res) => {
  let mockDate = {
    expectedData: [
      Mock.mock('@integer(0, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),

    ],
    actualData: [
      Mock.mock('@integer(0, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
    ]
  }
  let sumMockDate = 0
  mockDate.actualData.forEach((el, index) => {
    sumMockDate += el
  })
  res.send({
    code: 20000,
    msg: '',
    data: {
      grossData: {
        newVisitis: Mock.mock('@integer(0, 1000)'),
        messages: Mock.mock('@integer(0, 1000)'),
        purchases: Mock.mock('@integer(0, 1000)'),
        shoppings:sumMockDate
      },
      lineChartData: mockDate
    }
  })
})
server.get('/echarts/admin/purchases', (req, res) => {
  let mockDate = {
    expectedData: [
      Mock.mock('@integer(0, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),

    ],
    actualData: [
      Mock.mock('@integer(0, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
    ]
  }
  let sumMockDate = 0
  mockDate.actualData.forEach((el, index) => {
    sumMockDate += el
  })
  res.send({
    code: 20000,
    msg: '',
    data: {
      grossData: {
        newVisitis: Mock.mock('@integer(0, 1000)'),
        messages: Mock.mock('@integer(0, 1000)'),
        purchases:  sumMockDate,
        shoppings: Mock.mock('@integer(0, 1000)')
      },
      lineChartData: mockDate
    }
  })
})
server.get('/echarts/admin/newVisitis', (req, res) => {
  let mockDate = {
    expectedData: [
      Mock.mock('@integer(0, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),

    ],
    actualData: [
      Mock.mock('@integer(0, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
    ]
  }
  let sumMockDate = 0
  mockDate.actualData.forEach((el, index) => {
    sumMockDate += el
  })
  res.send({
    code: 20000,
    msg: '',
    data: {
      grossData: {
        newVisitis: sumMockDate,
        messages: Mock.mock('@integer(0, 1000)'),
        purchases: Mock.mock('@integer(0, 1000)'),
        shoppings: Mock.mock('@integer(0, 1000)')

      },
      lineChartData: mockDate
    }
  })
})
server.get('/echarts/admin/messages', (req, res) => {
  let mockDate = {
    expectedData: [
      Mock.mock('@integer(0, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),

    ],
    actualData: [
      Mock.mock('@integer(0, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
      Mock.mock('@integer(60, 1000)'),
    ]
  }
  let sumMockDate = 0
  mockDate.actualData.forEach((el, index) => {
    sumMockDate += el
  })
  res.send({
    code: 20000,
    msg: '',
    data: {
      grossData: {
        newVisitis: Mock.mock('@integer(0, 1000)'),
        messages: sumMockDate,
        purchases: Mock.mock('@integer(0, 1000)'),
        shoppings: Mock.mock('@integer(0, 1000)')

      },
      lineChartData: mockDate
    }
  })
})
// 服务启动在3000端口中
server.listen(3000, () => {
  console.log('JSON Server is running in http://localhost:3000')
})