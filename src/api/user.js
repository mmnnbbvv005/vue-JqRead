import request from '@/utils/request'

/**
 * 获取用户书架
 */
export function getBookList (data) {
  return request({
    url: '/sqlapi/booklist',
    method: 'post',
    data: {
      username: data.username
    }
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
