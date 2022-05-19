import expressJwt from 'express-jwt'

/**
 * @description: 校验用户的token
 * @return {Error|void} 校验的结果--错误对象或者没有返回
 */
export const token_verify = () => expressJwt({
    secret: PRIVITE_KEY,
    algorithms: ['HS256'],
    //得到正确格式的token
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
})

export default {
    token_verify
}