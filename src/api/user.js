import request from '@/utils/request'

/**
 * 获取用户书架
 */
export function getBookList () {
  return request({
    url: '/sqlapi/booklist',
    method: 'get'
  })
}

/**
 * 加入书架
 */
export function addBook (data) {
  return request({
    url: '/sqlapi/addBook',
    method: 'post',
    data: {
      username: data.username,
      book: data.book
    }
  })
}

/**
 * 更新章节
 */
export function Update (data) {
  return request({
    url: '/sqlapi/update',
    method: 'post',
    data: {
      username: data.username,
      lastChapter: data.lastChapter,
      id: data.id
    }
  })
}
