import axios from 'axios'
import qs from 'qs'

// 创建axios实例
const service = axios.create({
  timeout: 10000, // 请求超时时间
  transformrequest: data => qs.stringify(data)
})
// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.headers['X-Platform'] = window.__wxjs_environment === 'miniprogram' ? 'MiniProgram' : 'H5'
    return config
  },
  error => ({ status: 0, msg: error.message })
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response
    if (response.status === 200) {
      switch (res.status) {
      case 0: // 错误并提示
        if (!response.config.errorSelf) {
          //
        }
        return { data: res.data, msg: res.msg, status: false }
      case 1: // 成功返回数据
        return { data: res.data, msg: res.msg, status: true }
      case -1: // 暂不进行任何操作
        return { data: res.data, status: false }
      default:

        return { data: res.data, status: true }
      }
    }
    return { data: response.data, status: false }
  },
  error => {
    console.log('err' + error) // for debug
    switch (error.request.status) {
    case 401: // 无权限访问，需要登录
      return Promise.reject ? Promise.reject(error) : error
    case 500: // 请求接口错误
      if (error.config.linkError) {
        //
      }
      return Promise.reject ? Promise.reject(error) : error
    }
    return Promise.reject ? Promise.reject(error) : error
  }
)

export default service
