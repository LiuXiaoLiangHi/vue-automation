import axios from 'axios'
// el的 Message 组件
import { Message } from 'element-ui'
// 引入开发的绝对路径  
import baseUrl from './baseUrl.js'
// 引入store
import store from '@/store'
// 得到cookies中的token
import { getToken } from '@/utils/auth'


const http = {}
/**
 * @description: axios的实例对象
 */
const axiosInstance = axios.create({
    timeout: 5000, // 请求超时事件
    baseURL: baseUrl,// 绝对路径
    // 状态码判断，做出相应的处理
    validateStatus(status) {
        switch (status) {
            case 400:
                Message.error('请求出错')
                break
            case 401:
                Message.warning({
                    message: '授权失败，请重新登录'
                })
                // token失效，清除 登录用户信息
                //  1秒后刷新页面
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
                return
            case 403:
                Message.warning({
                    message: '拒绝访问'
                })
                break
            case 404:
                Message.warning({
                    message: '请求错误,未找到该资源'
                })
                break
            case 500:
                Message.warning({
                    message: '服务端错误'
                })
                break
        }
        //如 状态码为 200到300则成功
        return status >= 200 && status < 300
    }
})
// 添加请求拦截器
axiosInstance.interceptors.request.use(
    function (config) {
        // 请求头添加token
        // 判断本地是否有token的信息
        if (store.getters.token) {
            // 头部设置token
            let token = getToken()
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

// 响应拦截器即异常处理
axiosInstance.interceptors.response.use(
    response => {
        return response.data
    },
    err => {
        if (err && err.response) {
            console.log(err);
        } else {
            err.message = '连接服务器失败'
        }
        // Message.error({
        //     message: err.message
        // })
        return Promise.reject(err.response)
    }
)

// 对get请求进行封装
http.get = function (url, options) {
    return new Promise((resolve, reject) => {
        axiosInstance
            .get(url, options)
            .then(response => {
                console.log(response, '////////');
                // 判断响应体的code码是否为对的状态码
                if (response.code === 20000 || response.code == 20000) {
                    // 如果msg信息为空或不存在
                    if (response.msg == '' || response.msg == null) {
                        console.log('不需要msg');
                    } else {
                        Message.success({
                            message: response.msg
                        })
                    }
                    resolve(response)
                } else {
                    Message.error({
                        message: response.msg
                    })
                    reject(response.msg)
                }
            })
            .catch(e => {
                console.log(e)
            })
    })
}
// 对post请求进行封装
http.post = function (url, data, options) {
    return new Promise((resolve, reject) => {
        axiosInstance.post(url, data, options)
            .then(response => {
                // 判断响应体的code码是否为对的状态码
                if (response.code === 20000 || response.code == 20000) {
                    Message.success({
                        message: response.msg
                    })
                    resolve(response)
                } else {
                    Message.error({
                        message: response.msg
                    })
                    reject(response.message)
                }
            })
            .catch(e => {
                console.log(e)
            })
    })
}

export default http
