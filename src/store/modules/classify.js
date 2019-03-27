
const classify = {
  state: {
    classifyIndex: null,
    classifyList: null,
    subClassify: null
  },
  mutations: {
    SET_CLASSOFYINDEX: (state, index) => {
      state.classifyIndex = index
    },
    SET_CLASSOFYLIST: (state, obj) => {
      state.classifyList = obj
    },
    SET_SUBCLASSIFY: (state, obj) => {
      state.subClassify = obj
    }
  },
  actions: {
    SetClassifyIndex ({ commit }, index) {
      commit('SET_CLASSOFYINDEX', index)
    },
    SetClassifyList ({ commit }, value) {
      commit('SET_CLASSOFYLIST', value)
    },
    SetSubClassify ({ commit }, value) {
      commit('SET_SUBCLASSIFY', value)
    }
  }
}

export default classify
