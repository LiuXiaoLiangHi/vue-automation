import { v4 as uuidv4 } from 'uuid';
/**
 * @class 用户类
 * @description:  用于注册新用户初始化用户信息
 */
export class User {
    constructor({ uu_id = uuidv4(), name = '', account, password, mobile, roles = ["editor"], avatar = '', isAllowDeleteUSer = false, router = [] }) {
        this.uu_id = uu_id //用户id
        this.name = name //名字
        this.account = account // 账号名
        this.password = password //密码
        this.mobile = mobile // 手机号
        this.roles = roles // 角色
        this.avatar = avatar // 用户头像
        this.isAllowDeleteUSer = isAllowDeleteUSer
        this.router = router
    }

}
