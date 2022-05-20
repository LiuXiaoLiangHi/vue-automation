/**
 * 该文件的作用是用于处理获取用户注册请求
 */
import { userDb } from '../../db/user/user.js'
import { User } from './user.js'
/**
 * @description:注册请求处理
 * @param {*} req 
 * @param {*} res
 * @return {*}
 */
export const register = async (req, res) => {
    const { userName, userPhoneNumber, userPassword } = req.body
    let result = await registerUser(userName, userPassword, userPhoneNumber)
    res.send(result)
}
/**
 * @description: 
 * @param {*} account 用户的账号
 * @param {*} password 用户的密码
 * @param {*} mobile 用户的手机
 * @return {*}
 */
function registerUser(account, password, mobile) {
    return new Promise((reslove, reject) => {
        // 获取所有用户的信息
        let userInfo = userDb.data.userInfo
        //过滤用户信息，判断用户是否存在数据库中-是否已经被注册
        let filterResult = userInfo.filter(element => element.account == account || element.mobile == mobile)

        if (filterResult.length !== 0) {
            reject({
                code: 60204,
                msg: '注册失败,当前用户存在哦'
            })
        } else {
            // 通过Uers类生成一个基础的用户信息
            let newUser = new User({ account, password, mobile })
            // 添加到数据库中
            userInfo.push({ ...newUser })
            // 写入数据库
            userDb.write()
            // 返回响应的数据
            reslove({
                code: 20000,
                msg: '注册成功'
            })
        }

    })
}