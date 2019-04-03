import { getBookList } from '@/api/user'
import { setStorage } from '@/utils/storage'
import { RouterLink } from '@/utils/tools'
const user = {
  state: {
    userInfo: null
  },
  mutations: {
    SET_USERINFO: (state, user) => {
      state.userInfo = user
    }
  },
  actions: {
    SetUserInfo ({ commit }, value) {
      var books = {}
      getBookList().then(res => {
        if (res.data.books.length > 0) {
          res.data.books.forEach(index => {
            books[index.id] = index
          })
        }
        if (value.login) {
          RouterLink('/home')
        }
        setStorage('mybooks', books)
        commit('SET_USERINFO', { username: res.data.username, books: books })
      })
    }
  }
}

export default user
