import request from '@/utils/request'

/**
 * 登录
 */
export function login (data) {
  return request({
    url: '/sqlapi/login',
    method: 'post',
    data: {
      username: data.username,
      password: data.password
    }
  })
}

/**
 * 注册
 */
export function register (data) {
  return request({
    url: '/sqlapi/register',
    method: 'post',
    data: {
      username: data.username,
      password: data.password
    }
  })
}
