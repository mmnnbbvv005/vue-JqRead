import request from '@/utils/request'

export function getBook (id) {
  return request({
    url: '/api/book/' + id,
    method: 'get'
  })
}

export function getRecommend (id) {
  return request({
    url: '/api/book/' + id + '/recommend',
    method: 'get'
  })
}

export function getBookSources (id) {
  return request({
    url: '/api/atoc',
    method: 'get',
    params: {
      view: 'summary',
      book: id
    }
  })
}

export function getChapters (id) {
  return request({
    url: '/api/atoc/' + id,
    method: 'get',
    params: {
      view: 'chapters'
    }
  })
}

export function getBookChapter (link) {
  return request({
    url: '/content/chapter/' + link,
    method: 'get',
    params: {
      k: '2124b73d7e2e1945',
      t: 1468223717
    }
  })
}
