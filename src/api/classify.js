import request from '@/utils/request'

/**
 * 获取带书籍数量的父分类
 */
export function getClassify () {
  return request({
    url: '/api/cats/lv2/statistics',
    method: 'get'
  })
}

/**
 * 获取带子分类的分类
 */
export function getSubClassify () {
  return request({
    url: '/api/cats/lv2',
    method: 'get'
  })
}

/**
 * 获取分类详情
 * @param {Object} data {gender=male(性别), type=hot(类型), major(主分类), minor(子分类), start(开始位置), limit(返回数目)}
 */
export function getClassifyInfo (data) {
  return request({
    url: '/api/book/by-categories',
    method: 'get',
    params: data
  })
}
