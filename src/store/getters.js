
const getters = {
  rank: state => state.book.rank,
  otherRank: state => state.book.otherRank,
  rankBook: state => state.book.rankBook,

  classifyIndex: state => state.classify.classifyIndex,
  classifyList: state => state.classify.classifyList,
  subClassify: state => state.classify.subClassify,

  userInfo: state => state.user.userInfo
}

export default getters
