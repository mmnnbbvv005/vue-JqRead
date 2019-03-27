import request from '@/utils/request'

/**
 * 获取排名分类
 */
export function getRankList () {
  return request({
    url: '/api/ranking/gender',
    method: 'get'
  })
}

/**
 * 获取排名详情
 * @param {string} id 排行类别id
 */
export function getRankBooks (id) {
  return request({
    url: '/api/ranking/' + id,
    method: 'get'
  })
}

/**
 * 获取搜索结果
 * @param {String} keyword 搜索关键字
 */
export function getSearchList (keyword) {
  return request({
    url: '/api/book/fuzzy-search',
    method: 'get',
    params: {
      query: keyword
    }
  })
}
