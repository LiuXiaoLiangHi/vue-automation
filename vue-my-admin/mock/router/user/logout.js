/**
 * 该文件的作用是用于处理获取用户退出请求
 */
export const logout = (req, res) => {
    res.send({
        code: 20000,
        msg: '退出成功'
    })
}