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
      var obj = null
      var bookrack = {}
      getBookList({ username: value.username }).then(res => {
        console.log(res)
        obj = {
          username: value.username
        }
        if (res.data.length > 0) {
          obj['books'] = res.data
          obj['books'].forEach(index => {
            bookrack[index.id] = index
          })
        }
        if (value.login) {
          setStorage('username', window.btoa(value.username))
          RouterLink('/home')
        }
        setStorage('mybooks', bookrack)
        commit('SET_USERINFO', obj)
      })
    }
  }
}

export default user
