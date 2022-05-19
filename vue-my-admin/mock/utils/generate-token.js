import jsonwebtoken from 'jsonwebtoken'
import { PRIVITE_KEY, EXPIRESD } from '../config/index.js'

/**
 * @description: 生成token
 * @param {*} userName 
 * @return {token}
 */
export const generateToken = (userName) => {
    return jsonwebtoken.sign({
        userName
    }, PRIVITE_KEY, {
        expiresIn: EXPIRESD
    });
}
