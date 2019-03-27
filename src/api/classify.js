import request from '@/utils/request'

export function getClassify () {
  return request({
    url: '/api/cats/lv2/statistics',
    method: 'get'
  })
}

export function getSubClassify () {
  return request({
    url: '/api/cats/lv2',
    method: 'get'
  })
}

export function getClassifyInfo (data) {
  return request({
    url: '/api/book/by-categories',
    method: 'get',
    params: data
  })
}
