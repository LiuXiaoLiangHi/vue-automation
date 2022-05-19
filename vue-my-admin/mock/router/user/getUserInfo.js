import { userDb } from '../../db/user/user.js'

export const getUserinfo = async (req, res) => {
    const { userName } = req.user
    let result = await getUserInfo(userName)
    res.send(result)
}

function getUserInfo(userName) {
    return new Promise((resolve, reject) => {
        // 获取所有用户的信息
        let userInfo = userDb.data.userInfo
        //遍历用户信息，找到需要匹配的一项
        let filterResult = userInfo.filter((elment) => elment.account == userName && elment.password == password)

        if (filterResult.length == 0) {
            resolve({
                code: 50008,
                msg: '权限不足，获取用户信息失败'
            })
        } else {
            // 删减用户的部分信息返回
            const de_userInfoArray = Object.entries(filterResult[0]).filter(([key, val]) => key !== 'password')
            const de_userInfo = Object.fromEntries(de_userInfo)
            reslove({
                code:20000,
                msg: '获取用户信息成功',
                data:de_userInfo
            })
        }
    })
}