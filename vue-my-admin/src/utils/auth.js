import Cookies from 'js-cookie'

/**@description 储存在cookies中token的key */
const TokenKey = 'Admin-Token'

/**
 * @description: 得到cookies中的token，并将其返回
 * @return {token} 用户的token
 */
export function getToken() {
  return Cookies.get(TokenKey)
}

/**
 * @description: 将用户的token设置在cookies中
 * @param {String} token 用户token
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

/**
 * @description: 移除cookies中的token
 * @return {Boolean} 移除的结果 true | false
 */
export function removeToken() {
  return Cookies.remove(TokenKey)
}
