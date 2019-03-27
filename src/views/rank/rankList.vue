<template>
  <div class="rank">
    <bookhead :title="title" />
    <div v-if="$route.query.isMore||$route.query.monthId" class="nav">
      <ul v-if="!$route.query.isMore" class="topNav">
        <li :class="navIndex==0?'active':''" @click="ranksel($route.query.id,0)">
          周榜
        </li>
        <li :class="navIndex==1?'active':''" @click="ranksel($route.query.monthId,1)">
          月榜
        </li>
        <li :class="navIndex==2?'active':''" @click="ranksel($route.query.totalId,2)">
          总榜
        </li>
      </ul>
      <ul v-else-if="$route.query.isMore" id="moreUl" class="moreNav">
        <li v-for="(item,index) in otherRankList" :key="index" class="moreli" :class="index==navIndex?'active':''" @click="ranksel(item._id,index)">
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div class="rank_frame" :style="$route.query.isMore||$route.query.monthId?'margin-top: 0.8rem;':''">
      <ul class="rank_book">
        <li v-for="(item,index) in rankBookList" :key="index">
          <router-link :to="{path:'/book/'+item._id}" class="rank_link">
            <div class="book_img">
              <img :src="'http://statics.zhuishushenqi.com'+item.cover" class="u-imgAuto" :alt="item.title">
            </div>
            <div class="book_info">
              <p class="book_name">
                {{ item.title }}
              </p>
              <p class="book_author">
                {{ item.author }}
              </p>
              <p class="book_shortIntro">
                {{ item.shortIntro }}
              </p>
              <div class="label">
                <p>
                  <span>{{ dealNum(item.latelyFollower) }}</span>
                  人气
                </p>
                <p>|</p>
                <p>
                  <span>{{ item.retentionRatio }}%</span>
                  留存
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import bookhead from '@/components/Layout/head/index.vue'
import { getRankBooks, getRankList } from '@/api/rank.js'
import { Indicator, Toast } from 'mint-ui'
import { mapGetters } from 'vuex'
export default {
  name: 'Rank',
  components: {
    bookhead
  },
  data () {
    return {
      rankBookList: [],
      weekList: [],
      monthList: [],
      totalList: [],
      rankindex: null,
      title: '',
      otherRankList: [],
      navIndex: 0
    }
  },
  computed: {
    ...mapGetters(['otherRank'])
  },
  mounted () {
    this.title = this.$route.query.title
    if (this.$route.query.isMore) {
      this.GetRankType()
    } else {
      this.GetBook(this.$route.query.id, res => {
        this.weekList = res
        this.rankBookList = res
      })
    }
  },
  methods: {
    GetBook (id, callback) {
      Indicator.open({
        text: '加载中……',
        spinnerType: 'double-bounce'
      })
      getRankBooks(id).then((res) => {
        Indicator.close()
        if (this.$route.query.isMore) {
          var li = document.querySelectorAll('.moreli')
          var width = null
          li.forEach(i => {
            width += i.offsetWidth + 10
          })
          document.querySelector('#moreUl').style.width = width + 20 + 'px'
        }
        if (callback) {
          callback(res.data.ranking.books)
        }
      }).catch(error => {
        console.log(error)
        Indicator.close()
        Toast('网络异常,请稍后再试！')
      })
    },
    ranksel (id, index) {
      if (this.navIndex === index) {
        return
      }
      this.navIndex = index
      this.rankBookList = []
      switch (index) {
      case 0:
        if (this.weekList.length > 0) {
          this.rankBookList = this.weekList
        } else {
          this.GetBook(id, res => {
            this.weekList = res
            this.rankBookList = res
          })
        }
        break
      case 1:
        if (this.monthList.length > 0) {
          this.rankBookList = this.monthList
        } else {
          this.GetBook(id, res => {
            this.monthList = res
            this.rankBookList = res
          })
        }
        break
      case 2:
        if (this.totalList.length > 0) {
          this.rankBookList = this.totalList
        } else {
          this.GetBook(id, res => {
            this.totalList = res
            this.rankBookList = res
          })
        }
        break
      }
    },
    GetRankType () {
      if (this.otherRank) {
        this.otherRankList = this.otherRank
        this.GetBook(this.otherRankList[0]._id)
      } else {
        getRankList().then(res => {
          this.otherRankList = res.data.male.filter(item => {
            return item.collapse
          })
          this.$store.dispatch('SetOtherRank', this.otherRankList)
          this.GetBook(this.otherRankList[0]._id)
        })
      }
    },
    dealNum (num) {
      var cun = 0
      if (num > 10000) {
        cun = (num / 10000).toFixed(1) + '万'
      } else {
        cun = num
      }
      return cun
    }
  }
}
</script>

<style lang="less" scoped>
.nav{ position: fixed; z-index: 111; top: 80/@rem; overflow-x: auto; height: 80/@rem; line-height: 80/@rem; width: 100%; background: #fff;
  .topNav{ display: flex; justify-content: space-around;
    li{ position: relative; width: 33%; text-align: center; font-size: @font_text2; color: #333; }
  }
  .moreNav{ width: auto; height: 100%; overflow: hidden;
    li{ position: relative; float: left; margin: 0 10/@rem; font-size: @font_text; color: #333333;}
    }
  }
  .active{ color: @main_col1 !important;
    &::after{ content: ""; display: block; position: absolute; bottom: 10/@rem; left: 0; height: 4/@rem; width: 100%; background: @main_col1; }
}
.rank{ width: 100%; height: 100%; }
.rank_frame{  width: 100%; overflow: hidden;
  .rank_book{width: 100%; height: 100%;padding: 20/@rem; overflow: auto;
    li{ width: 100%; height: 180/@rem; background: #fff; margin-bottom: 20/@rem;
      &:last-child{ margin: 0; }
      .rank_link{ display: block;display: flex; width: 100%; height: 100%; }
      .book_img{ height: 100%; width: 126/@rem; }
      .book_info{ margin-left: 20/@rem; width: 440/@rem; color: @font_col3;
        .book_name{ font-size: @font_ord; font-weight: bold; color: #333333; }
        .book_author{ font-size: @font_text; margin-top: 10/@rem; }
        .book_shortIntro{ margin-top: 10/@rem; font-size: @font_text1; overflow: hidden;text-overflow: ellipsis;display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2;}}
        .label{ margin-top: 10/@rem; display: flex; font-size: @font_text; color: #333;
          p{ margin-right: 20/@rem; }
          span{ color: #b93321; }
        }
    }
  }
}
</style>
