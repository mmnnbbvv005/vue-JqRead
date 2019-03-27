<template>
  <div>
    <bookhead :title="$route.query.major" />
    <div class="menu">
      <div v-if="$route.query.major!=='传记名著'" class="type nav">
        <p v-for="(item,index) in typeList" :key="index" :class="type===item.value?'active':''" @click="selType(item.value)">
          {{ item.name }}
        </p>
      </div>
      <div v-if="minor&&minor.length>0" class="minor nav">
        <p :class="nowMinor===''?'active':''" @click="selMinor('')">
          全部
        </p>
        <p v-for="(item,index) in minor" :key="index" :class="nowMinor===item?'active':''" @click="selMinor(item)">
          {{ item }}
        </p>
      </div>
    </div>
    <div class="content" :style="'margin-top:'+top+'rem'">
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <li v-for="(item,index) in BookList" :key="index">
          <router-link :to="{path:'/book/'+item._id}" class="rank_link">
            <div class="book_img">
              <img v-lazy="'http://statics.zhuishushenqi.com'+item.cover" class="u-imgAuto" :alt="item.title">
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
      <div v-show="showLoad" class="loading">
        <Spinner type="fading-circle" color="#eb2d4a" class="svg-load" />
        <p>加载中</p>
      </div>
    </div>
  </div>
</template>

<script>
import bookhead from '@/components/Layout/head/index.vue'
import { getClassifyInfo, getSubClassify } from '@/api/classify'
import { mapGetters } from 'vuex'
import { Spinner, Toast } from 'mint-ui'
export default {
  components: {
    bookhead,
    Spinner
  },
  data () {
    return {
      minor: [],
      typeList: [{ name: '热门', value: 'hot' }, { name: '新书', value: 'new' }, { name: '好评', value: 'reputation' }, { name: '完结', value: 'over' }, { name: '包月', value: 'monthly' }],
      type: 'hot',
      nowMinor: '',
      BookList: [],
      top: 1.4,
      page: 0,
      loading: false,
      showLoad: false
    }
  },
  computed: {
    ...mapGetters(['subClassify'])
  },
  mounted () {
    if (this.subClassify) {
      this.minor = this.subClassify[this.$route.query.gender].filter(i => {
        return i.major === this.$route.query.major
      })[0].mins
      if (this.minor.length <= 0) {
        this.top = 0.7
        if (this.$route.query.major === '传记名著') {
          this.top = 0
        }
      }
    } else {
      this.GetSubClassify()
    }
  },
  methods: {
    GetClassifyInfo (minor, start, load) {
      if (!load) {
        this.BookList = []
      }
      this.showLoad = true
      getClassifyInfo({ gender: this.$route.query.gender, type: this.type, major: this.$route.query.major, minor: minor, start: start, limit: 10 }).then(res => {
        this.showLoad = false
        if (load) {
          this.BookList = this.BookList.concat(res.data.books)
        } else {
          this.BookList = res.data.books
        }
        this.loading = false
      }).catch(error => {
        console.log(error)
        this.showLoad = false
        Toast('网络异常,请稍后再试！')
      })
    },
    GetSubClassify () {
      getSubClassify().then(res => {
        this.minor = res.data[this.$route.query.gender].filter(i => {
          return i.major === this.$route.query.major
        })[0].mins
        if (this.minor.length <= 0) {
          this.top = 0.7
          if (this.$route.query.major === '传记名著') {
            this.top = 0
          }
        }
        this.$store.dispatch('SetSubClassify', res.data)
      })
    },
    dealNum (num) {
      var cun = 0
      if (num > 10000) {
        cun = (num / 10000).toFixed(1) + '万'
      } else {
        cun = num
      }
      return cun
    },
    selType (type) {
      if (type === this.type) return
      this.type = type
      this.page = 0
      this.GetClassifyInfo(this.nowMinor, 0, false)
    },
    selMinor (value) {
      if (value === this.nowMinor) return
      this.nowMinor = value
      this.page = 0
      this.GetClassifyInfo(this.nowMinor, 0, false)
    },
    loadMore () {
      this.loading = true
      this.GetClassifyInfo(this.nowMinor, this.page, true)
      this.page += 20
    }
  }
}
</script>

<style lang="less" scoped>
.menu{ position: fixed; top:80/@rem; width: 100%; }
.nav{ position: relative; z-index: 111; padding: 0 10/@rem; display: flex; width: 100%; height: 70/@rem; line-height: 70/@rem; font-size: @font_text1; color: @font_col2; background: @font_col6;
  p{ padding: 0 10/@rem; text-align: center; height: 100%; }
  .active{ color: @main_col1; }
}
.type{ border-bottom: 2/@rem solid @font_col4; }
.content{ width: 100%;
  ul{width: 100%; height: 100%;padding: 20/@rem;
    li{ width: 100%; height: 180/@rem; background: #fff; margin-bottom: 20/@rem;
      &:last-child{ margin: 0; }
      .rank_link{ display: block;display: flex; width: 100%; height: 100%; }
      .book_img{ height: 100%; width: 140/@rem; }
      image[lazy=loading] {width: 140/@rem;height: 100%;}
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
.loading{ text-align: center;
  .svg-load{ display: inline-block; margin-bottom: 20/@rem; }
}
</style>
