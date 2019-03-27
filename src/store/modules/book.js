
const book = {
  state: {
    rank: null,
    otherRank: null,
    rankBook: null,
    classfiy: null
  },
  mutations: {
    SET_RANK: (state, rank) => {
      state.rank = rank
    },
    SET_OTHERRANK: (state, rank) => {
      state.otherRank = rank
    },
    SET_RANKBOOK: (state, rankBook) => {
      state.rankBook = rankBook
    },
    SET_CLASSFIY: (state, classfiy) => {
      state.classfiy = classfiy
    }
  },
  actions: {
    SetRank ({ commit }, value) {
      commit('SET_RANK', value)
    },
    SetOtherRank ({ commit }, value) {
      commit('SET_OTHERRANK', value)
    },
    SetRankBook ({ commit }, value) {
      commit('SET_RANKBOOK', value)
    },
    SetClassfiy ({ commit }, value) {
      commit('SET_CLASSFIY', value)
    }
  }
}

export default book
