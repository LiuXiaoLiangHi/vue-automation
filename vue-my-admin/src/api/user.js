import http from '../config/httpConfig'

// 向后端发送登录请求
export function fetchLogin(data) {
  return http.post('/user/login', data)
}
// 向后端发送得到用户信息的请求
export function getInfo() {
  return http.get('/user/info')

}

// 向后端发送退出登录的请求
export function logout() {
  return http.post('/user/logout')
}

// 向后端发送注册用户的请求
export function fetchRegister(userInfo) {
  return http.post('/user/register', userInfo)
}