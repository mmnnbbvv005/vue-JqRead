import request from '@/utils/request'
/**
 * 获取书籍详情
 * @param {String} id 书籍ID
 */
export function getBook (id) {
  return request({
    url: '/api/book/' + id,
    method: 'get'
  })
}

/**
 * 获取书籍相关推荐
 * @param {String} id  书籍id
 */
export function getRecommend (id) {
  return request({
    url: '/api/book/' + id + '/recommend',
    method: 'get'
  })
}

/**
 * 获取书籍源
 * @param {String} id 书籍id
 */
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

/**
 * 获取书籍章节
 * @param {String} id 书籍id
 */
export function getChapters (id) {
  return request({
    url: '/api/atoc/' + id,
    method: 'get',
    params: {
      view: 'chapters'
    }
  })
}

/**
 * 获取章节详细内容
 * @param {String} link 章节地址
 */
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
