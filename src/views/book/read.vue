/* 内容页 */
<template>
  <div class="read_frame" :style="light?theme:'background:#000;color:#eee;'">
    <readHead v-show="headflag" @GoBack="goBack" />
    <div class="read" @click="Action">
      <p class="read_head txt-ellipsis">
        {{ title }}
      </p>
      <div ref="textcontent" class="textcontent">
        <ul id="flipbook" ref="readtext" class="read_text" :style="'font-size:0.'+fontSize+'rem'">
          <li class="text_title">
            {{ title }}
          </li>
          <li v-for="(item,i) in textList" :key="i" class="book_text">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <readFooter v-show="headflag" :source="source" :name="name" :chapter="chapter" :all-chapter="allChapter" :light="light" @NextChapt="nextChapter" @PrevChapt="prevChapter" @Chapter="openChapter" />
    <readSetting v-show="settingflag" :font-size="fontSize" />
    <mt-popup
      v-model="chaptersVisible"
      popup-transition="popup-fade"
    >
      <div class="chapter">
        <p>{{ name }}</p>
        <ul>
          <li v-for="(item,i) in chapters" :key="i" @click="selChapter(item,i)">
            {{ item.title }}
          </li>
        </ul>
      </div>
    </mt-popup>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
    >
      <div class="couple">
        <p>反馈意见</p>
        <textarea id="couple_tex" cols="30" rows="5" />
        <div class="submit">
          <button class="elAct">
            提交
          </button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { getChapters, getBookChapter } from '@/api/book'
import { Update } from '@/api/user'
import { Indicator, MessageBox, Toast } from 'mint-ui'
import { getStorage, setStorage } from '@/utils/storage'
import { mapGetters } from 'vuex'

import readHead from '@/components/Layout/read/head'
import readFooter from '@/components/Layout/read/footer'
import readSetting from '@/components/Layout/read/setting'
export default {
  name: 'Read',
  components: {
    readHead,
    readFooter,
    readSetting
  },
  data () {
    return {
      title: '',
      name: '',
      textList: [],
      chapters: [],
      source: '',
      headflag: false,
      settingflag: false,
      chapter: 0,
      allChapter: 0,
      light: true,
      popupVisible: false,
      chaptersVisible: false,
      fontSize: 34,
      theme: {
        background: '#FAF9DE',
        color: '#000'
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted () {
    this.init()
    // MessageBox.confirm('需要全屏阅读吗?').then(action => {
    //   this.fullScreen()
    // }).catch(res => {
    //   return
    // })
  },
  methods: {
    // 初始化
    init () {
      if (getStorage('mybooks') && getStorage('mybooks')[this.$route.params.id]) {
        this.GetCata(getStorage('mybooks')[this.$route.params.id].source)
        this.source = getStorage('mybooks')[this.$route.params.id].source
        this.name = getStorage('mybooks')[this.$route.params.id].title
      } else if (this.$route.query) {
        var obj = this.$route.query
        if (obj.source) {
          this.GetCata(obj.source)
          this.source = obj.source
          this.name = obj.title
        }
      }
    },
    // 获取书籍章节
    GetCata (id) {
      var link = null
      Indicator.open({
        text: '加载中……',
        spinnerType: 'double-bounce'
      })
      getChapters(id).then(res => {
        this.chapters = res.data.chapters
        this.allChapter = res.data.chapters.length - 1
        if (getStorage('mybooks') && getStorage('mybooks')[this.$route.params.id]) {
          if (getStorage('mybooks')[this.$route.params.id].lastChapter || getStorage('mybooks')[this.$route.params.id].lastChapter === 0) {
            this.chapter = getStorage('mybooks')[this.$route.params.id].lastChapter
          }
        }
        if (this.$route.query.Chapter) {
          this.chapter = this.$route.query.Chapter
        }
        link = this.chapters[this.chapter].link
        this.title = this.chapters[this.chapter].title
        this.GetContent(encodeURIComponent(link))
      })
    },
    // 获取章节内容
    GetContent (link) {
      getBookChapter(link).then(res => {
        Indicator.close()
        var txt = res.data.chapter.body
        this.textList = txt.split('\n')
        document.querySelector('.textcontent').scrollTop = 0
      })
    },
    // 点击事件判断
    Action (el) {
      var width = document.body.clientWidth / 4
      if (el.clientX <= width) {
        this.prevChapter()
      } else if (el.clientX >= width * 3) {
        this.nextChapter()
      } else {
        if (this.settingflag) {
          this.settingflag = false
          return
        }
        this.headflag = !this.headflag
      }
    },
    // 下一章
    nextChapter () {
      var _this = this
      if (this.chapter < this.allChapter) {
        var obj = getStorage('mybooks')
        this.chapter++
        this.title = this.chapters[this.chapter].title
        Indicator.open({
          text: '加载中……',
          spinnerType: 'double-bounce'
        })
        this.GetContent(encodeURIComponent(this.chapters[this.chapter].link))
        if (_this.userInfo) {
          var book = { username: _this.userInfo.username, lastChapter: _this.chapter, id: _this.$route.params.id }
          Update(book)
        } else if (getStorage('mybooks') && getStorage('mybooks')[this.$route.params.id]) {
          obj[this.$route.params.id].lastChapter = this.chapter
          setStorage('mybooks', obj)
        }
      } else {
        Toast('已经是最新章节了！')
      }
    },
    // 上一章
    prevChapter () {
      var _this = this
      var obj = getStorage('mybooks')
      if (this.chapter <= 0) {
        Toast('已经是第一章了！')
        return
      }
      this.chapter--
      this.title = this.chapters[this.chapter].title
      Indicator.open({
        text: '加载中……',
        spinnerType: 'double-bounce'
      })
      this.GetContent(encodeURIComponent(this.chapters[this.chapter].link))
      if (_this.userInfo) {
        var book = { username: _this.userInfo.username, lastChapter: _this.chapter, id: _this.$route.params.id }
        Update(book)
      } else if (getStorage('mybooks') && getStorage('mybooks')[this.$route.params.id]) {
        obj[this.$route.params.id].lastChapter = this.chapter
        setStorage('mybooks', obj)
      }
    },
    // 返回
    goBack () {
      var book = null
      if (getStorage('mybooks')) {
        book = getStorage('mybooks')
      }
      if (getStorage('mybooks')[this.$route.params.id]) {
        book[this.$route.params.id].lastChapter = this.chapter
        setStorage('mybooks', book)
        this.$router.go(-1)
      } else {
        MessageBox.confirm('需要将该小说加入书架吗?').then(action => {
          var storage = this.$route.query
          storage.lastChapter = this.chapter
          book[this.$route.params.id] = storage
          setStorage('mybooks', book)
          this.$router.go(-1)
        }).catch(res => {
          this.$router.go(-1)
        })
      }
    },
    // 全屏
    fullScreen () {
      var el = document.documentElement
      var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen
      if (typeof rfs !== 'undefined' && rfs) {
        rfs.call(el)
      }
      return
    },
    // 打开目录
    openChapter () {
      this.chaptersVisible = true
    },
    // 选择章节
    selChapter (item, index) {
      var _this = this
      var obj = getStorage('mybooks')
      this.chapter = index
      this.title = item.title
      Indicator.open({
        text: '加载中……',
        spinnerType: 'double-bounce'
      })
      this.GetContent(encodeURIComponent(item.link))
      if (_this.userInfo) {
        var book = { username: _this.userInfo.username, lastChapter: _this.chapter, id: _this.$route.params.id }
        Update(book)
      } else if (getStorage('mybooks') && getStorage('mybooks')[this.$route.params.id]) {
        obj[this.$route.params.id].lastChapter = this.chapter
        setStorage('mybooks', obj)
      }
      this.chaptersVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.read_frame{ width: 100%; height: 100%; }
.read{ width: 100%; height: 100%; overflow: hidden; display: flex;flex-direction: column; }
.read_head{width: 90%; margin-left: 20/@rem; flex: 1; line-height: 60/@rem; text-align: center;}
.textcontent{overflow: auto; flex: 20; }
.read_text{
  li{ padding: 0 20/@rem; line-height: 60/@rem;text-indent: 2em; }
  .text_title{ font-weight: 700; text-indent: 0; }}

.chapter{ position: relative; width: 550/@rem; height: 1000/@rem; overflow: auto;
  p{ position: fixed; top:-1/@rem; width: 100%; height: 60/@rem; line-height: 60/@rem; text-align: center; background: #fff; border-bottom: 2/@rem solid @font_col4; }
  ul{ margin-top: 60/@rem; }
  li{ width: 100%; padding: 20/@rem; border-bottom: 2/@rem solid @font_col4; }
}

.couple{ width: 450/@rem;
  p{ text-align: center; margin-top: 20/@rem; }
  #couple_tex{ border: 2/@rem solid #9a9a9a; margin: 30/@rem auto; display: block; }
  .submit{ width: 100%; height: 50/@rem; line-height: 50/@rem; background: @main_col1; text-align: center;
    button{  color:#fff;  width: 100%; height: 100%; }}
}
</style>
