import { generateToken } from '../../utils/generate-token.js'
import { userDb } from '../../db/user/user.js'

export const login = async (req, res) => {
    // 从请求体中获取用户名和密码
    const { username, password } = req.body;
    // 调用对应的方法去获取结果
    let result = await readUserInfoToLogin(username, password)
    //将结果返回
    res.send(result)
}

/**
 * @description: 读取数据库信息来判断用户名密码是否错误
 * @param {String} userName 用户的用户名
 * @param {String} password 用户的密码
 * @return {Promise} 
 */
function readUserInfoToLogin(userName, password) {
    return new Promise((resolve, reject) => {
        // 获取所有用户的信息
        let userInfo = userDb.data.userInfo
        //过滤用户信息，判断登录的用户是否存在数据库中
        let filterResult = userInfo.filter((elment) => elment.account == userName && elment.password == password)

        if (filterResult.length == 0) {
            reject({
                code: 60204,
                msg: '登录失败,用户名或密码错误'
            })
        } else {
            resolve({
                code: 20000,
                msg: '登录成功',
                data: {
                    token: generateToken()
                }
            })
        }

    })
}