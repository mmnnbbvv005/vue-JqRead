<template>
  <div class="book">
    <bookhead :title="details.title" />
    <!-- 书架封面 -->
    <div class="book_head">
      <div class="book_img u-fLeft">
        <img v-if="details.cover" :src="'http://statics.zhuishushenqi.com'+details.cover" class="u-imgAuto" :alt="details.title">
      </div>
      <div class="book_title u-fRinght">
        <p class="book_name">
          {{ details.title }}
        </p>
        <p class="book_author">
          {{ details.author }}
        </p>
        <p>类型:{{ details.majorCate }}</p>
        <p>字数:{{ wordCount }}</p>
      </div>
    </div>
    <!-- 书籍简介 -->
    <div class="book_frame book_info">
      <p class="lastChapter txt-ellipsis">
        最新章节:
        <span>{{ details.lastChapter }}</span>
      </p>
      <div class="book_longIntro">
        <p>{{ details.longIntro }}</p>
      </div>
    </div>
    <!-- 目录 -->
    <router-link :to="{path:'/cata/'+details._id,query:{ lastChapter: storage.lastChapter, title: storage.title, source: storage.source }}" class="book_frame catalog">
      <p class="frame_title">
        目录
      </p>
      <span>浏览目录</span>
    </router-link>
    <!-- 相关书籍 -->
    <div class="book_frame book_relation">
      <p class="frame_title">
        猜你喜欢
      </p>
      <ul>
        <li v-for="(item,index) in relation" :key="index">
          <router-link :to="{path:'/book/'+item._id}">
            <div class="relation_img">
              <img :src="'http://statics.zhuishushenqi.com'+item.cover" :alt="item.title" class="u-imgAuto">
            </div>
            <p class="txt-ellipsis">
              {{ item.title }}
            </p>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 底部按钮 -->
    <div class="bottom">
      <button class="add" @click="addbook">
        加入书架
      </button>
      <button class="reade" @click="readbook">
        立即阅读
      </button>
    </div>
  </div>
</template>

<script>
import { getBook, getRecommend, getBookSources } from '@/api/book'
import { addBook } from '@/api/user'
import { setStorage, getStorage } from '@/utils/storage'
import { Indicator, Toast } from 'mint-ui'
import bookhead from '@/components/Layout/head/index.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Book',
  components: {
    bookhead
  },
  data () {
    return {
      details: {},
      wordCount: 0,
      relation: [],
      source: null,
      storage: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    // 监听路由变化重新渲染页面
    $route (newVal) {
      this.GetBook(newVal.params.id)
      this.GetRelation(newVal.params.id)
    }
  },
  mounted () {
    this.GetBook(this.$route.params.id)
    this.GetRelation(this.$route.params.id)
    this.GetSource(this.$route.params.id)
  },
  methods: {
    // 获取书籍详情
    GetBook (id) {
      Indicator.open({
        text: '加载中……',
        spinnerType: 'double-bounce'
      })
      var _this = this
      getBook(id).then(res => {
        Indicator.close()
        _this.details = res.data
        this.storage = {
          id: this.details._id,
          title: this.details.title,
          cover: this.details.cover,
          source: this.source,
          lastChapter: 0
        }
        _this.wordCount = res.data.wordCount > 10000 ? parseInt(res.data.wordCount / 1000) + '万字' : res.data.wordCount + '字'
      })
    },
    // 获取相关书籍
    GetRelation (id) {
      this.relation = []
      var _this = this
      getRecommend(id).then(res => {
        for (var i = 0; i < 6; i++) {
          _this.relation.push(res.data.books[i])
        }
      })
    },
    // 加入书架
    addbook () {
      var books = {}
      if (this.userInfo) {
        books = this.storage
        addBook({ username: this.userInfo.username, book: books }).then(res => {
          if (res.status) {
            console.log(res)
            Toast('成功添加！')
            this.$store.dispatch('SetUserInfo', { username: window.atob(getStorage('username')) })
          }
        })
      } else {
        if (getStorage('mybooks')) {
          if (!getStorage('mybooks')[this.details._id]) {
            books = getStorage('mybooks')
            books[this.details._id] = this.storage
            setStorage('mybooks', books)
            Toast('成功添加！')
          } else {
            Toast('已经在书架了噢！')
          }
        } else {
          books[this.details._id] = this.storage
          setStorage('mybooks', books)
        }
      }
    },
    // 获取书架源
    GetSource (id) {
      getBookSources(id).then(res => {
        this.source = res.data[1]._id
        this.storage.source = res.data[1]._id
      })
    },
    // 立即阅读
    readbook () {
      if (this.source) {
        this.$router.push({ name: 'read', params: { id: this.details._id }, query: { lastChapter: this.storage.lastChapter, title: this.storage.title, source: this.storage.source }})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.book_head{ width: 100%; height: 300/@rem; background: url('../../assets/img/headbg.jpg')no-repeat; background-size: cover; padding: 30/@rem;
  .book_img{ height: 100%; }
  .book_title{ text-align: right; line-height: 40/@rem; }
  .book_name{ font-size: @font_title2; margin: 20/@rem 0; font-weight: 700; }
}
.book_frame{position: relative; width:600/@rem; margin: 20/@rem auto;padding: 0 20/@rem; background: #fff;}
.book_info{  padding: 20/@rem; font-size: @font_ord;
  .lastChapter{ width: 100%; margin: 10/@rem 0;
    span{ color: @main_col2; } }
  .book_longIntro{ text-indent: 2em; }
}
.frame_title::before{ content: ""; display: block; position: absolute; width: 4/@rem; height: 70/@rem; background: @main_col1; left: 0; }
.catalog{ display: block;  height: 70/@rem; line-height: 70/@rem; overflow: hidden;
  p{ float: left; font-size: @font_title;}
  span{ float: right; font-size: @font_text2; color: @font_col3; }}
.book_relation{ margin-bottom: 80/@rem;
  .frame_title{ line-height: 70/@rem; }

  ul{ margin-top: 20/@rem; overflow: hidden;
    li{ float: left; margin-left: 20/@rem; margin-bottom: 20/@rem;
       p{ width: 160/@rem; margin-top: 20/@rem; }
      .relation_img{ height: 220/@rem; width: 160/@rem; }}
  }
}
.bottom{ width: 100%; height: 80/@rem; line-height: 80/@rem; position: fixed; bottom: -1/@rem; left: 0; background: #fff; display: flex; box-shadow: 0 0 10/@rem 5/@rem @font_col4;
  button{ width: 50%; font-size: @font_ord; }
  .reade{ background: @main_col2; color: @font_col6; }
}
</style>
