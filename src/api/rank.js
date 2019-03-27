import request from '@/utils/request'

export function getRankList () {
  return request({
    url: '/api/ranking/gender',
    method: 'get'
  })
}

export function getRankBooks (params) {
  return request({
    url: '/api/ranking/' + params.id,
    method: 'get'
  })
}

export function getSearchList (keyword) {
  return request({
    url: '/api/book/fuzzy-search',
    method: 'get',
    params: {
      query: keyword
    }
  })
}
