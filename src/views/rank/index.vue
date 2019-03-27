<template>
  <div class="rank">
    <BottomNav />
    <bookhead :back-visible="false" title="排行榜" />
    <div class="rank_frame">
      <ul class="rank_list">
        <li v-for="(item,index) in rank" :key="index" @click="goRankList(item)">
          <div class="cover u-cenInBlock">
            <img :src="'http://statics.zhuishushenqi.com'+item.cover" alt="item.title">
          </div>
          <div class="empt" :style="'background:'+bag[index]" />
          <p>
            {{ item.title }}
          </p>
        </li>
        <li v-show="showMore" @click="more">
          <div class="cover more u-cenInBlock">
            <icon name="More" class="svg_more" />
          </div>
          <div class="empt" />
          <p>
            更多
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import bookhead from '@/components/Layout/head/index.vue'
import BottomNav from '@/components/Layout/bottomNav/index'
import { getRankList } from '@/api/rank.js'
import { Indicator, Toast } from 'mint-ui'
import { mapGetters } from 'vuex'
import { RouterLink } from '@/utils/tools'
export default {
  name: 'Rank',
  components: {
    BottomNav,
    bookhead
  },
  data () {
    return {
      rankList: [],
      showMore: true,
      bag: ['#F5DAD9', '#FD9B78', '#DCF5D9', '#D9F5F2', '#D9E9F5', '#F0F5D9', '#DCD9F5']
    }
  },
  computed: {
    ...mapGetters(['rank', 'rankBook'])
  },
  mounted () {
    this.GetRank()
  },
  methods: {
    GetRank () {
      if (this.rank) {
        this.rankList = this.rank
        if (this.rankBook) {
          this.rankBookList = this.rankBook
        }
      } else {
        Indicator.open({
          text: '加载中……',
          spinnerType: 'double-bounce'
        })
        this.showMore = false
        getRankList().then((res) => {
          Indicator.close()
          this.showMore = true
          var arr = res.data.male.filter(item => {
            return !item.collapse
          })
          this.otherRankList = res.data.male.filter(item => {
            return item.collapse
          })
          this.$store.dispatch('SetRank', arr)
          this.rankList = arr
        }).catch(error => {
          console.log(error)
          Indicator.close()
          Toast('网络异常,请稍后再试！')
        })
      }
    },
    goRankList (item) {
      RouterLink({ path: '/rankList', query: { id: item._id, title: item.title, monthId: item.monthRank, totalId: item.totalRank }})
    },
    more () {
      RouterLink({ path: '/rankList', query: { title: '更多', isMore: true }})
    }
  }
}
</script>

<style lang="less" scoped>
.rank{ width: 100%; height: 100%; }
.rank_frame{ margin-bottom: 1rem; width: 100%;background: #fff; overflow: hidden; height: calc(~"100% - 1rem"); height: -webkit-calc(~"100% - 1rem");height: -moz-calc(~"100% - 1rem");
  .rank_list{ font-size: @font_text1;  overflow: auto;
    li{  position: relative; height: 100/@rem; line-height: 100/@rem; width: 540/@rem;  margin: 20/@rem auto; border: 1/@rem solid @font_col4; border-radius: 20/@rem; overflow: hidden;
      .cover{ margin-top: 20/@rem; margin-left: 40/@rem; width: 60/@rem; height: 60/@rem; float: left; border-radius: 50%;
      img{ width: auto; height: 100%;}}
      .empt{ position: absolute; right: -10/@rem; top: -45/@rem; width: 340/@rem; height: 220/@rem; background: #8DD8E2; transform: rotate(20deg); z-index: 1; }
      P{ position: absolute; left: 260/@rem; font-size: 26/@rem; display:block; font-weight: bold; z-index: 2; }
      .more{ background: @main_col5; line-height: 60/@rem;
        .svg_more{ display: block; width: 50%; height: 50%; margin: 15/@rem auto; color: @font_col6; }
      }
    }
  }
}
</style>
