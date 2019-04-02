<template>
  <div class="search">
    <BottomNav />
    <bookhead :back-visible="false" :search-visible="false" title="搜索" />
    <div class="search_ipt">
      <input v-model="text" type="search" placeholder="请输入您想要搜索的书名">
      <div class="svg" @click="GetSearch">
        <icon name="Search" class="svg_search u-cenInBlock" />
      </div>
    </div>
    <ul class="search_list">
      <li v-for="(item,i) in list" :key="i">
        <router-link :to="{path:'/book/'+item._id}" class="list_link">
          <div class="list_img">
            <img v-lazy="'http://statics.zhuishushenqi.com'+item.cover" :alt="item.title" class="u-imgAuto">
          </div>
          <div class="list_info">
            <p class="list_title">
              {{ item.title }}
            </p>
            <p class="list_author">
              {{ item.author }}
            </p>
            <p class="list_shortIntro">
              {{ item.shortIntro }}
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import bookhead from '@/components/Layout/head/index.vue'
import BottomNav from '@/components/Layout/bottomNav/index'
import { getSearchList } from '@/api/rank'
import { Indicator } from 'mint-ui'
export default {
  components: {
    BottomNav,
    bookhead
  },
  data () {
    return {
      text: '',
      list: [],
      loading: false
    }
  },
  methods: {
    GetSearch () {
      Indicator.open({
        text: '加载中……',
        spinnerType: 'double-bounce'
      })
      this.list = []
      this.loading = true
      getSearchList(this.text).then(res => {
        Indicator.close()
        this.list = res.data.books
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search_ipt{ position: relative; width: 100%; height: 50/@rem;padding: 0/@rem 20/@rem; margin-top: 20/@rem;
  input{ width: 100%; height: 100%; background: #fff; border-radius: 20/@rem; font-size: @font_ord; text-indent: 20/@rem; }
  .svg{ position: absolute; right: 40/@rem; top: 0; height: 100%; width: 60/@rem; line-height: 50/@rem; text-align: center;
    .svg_search{ width: 30/@rem; height: 30/@rem; }}
}
.load{ width: 50/@rem; height: 50/@rem; margin: 80/@rem auto; }
.search{ height: 100%;  width: 100%; }
.search_list{ padding: 20/@rem; margin-top: 20/@rem; overflow: auto; height: 870/@rem;
  li{ background: #fff; height: 250/@rem; margin-bottom: 20/@rem;
    .list_link{ display: block; display: flex; width: 100%; height: 100%; }
    .list_img{ height: 100%;width: 175/@rem; }
    image[lazy=loading] {width: 175/@rem;height: 100%;}
    .list_info{ flex: 1;padding: 10/@rem; line-height: 40/@rem;
      .list_title{ font-size: @font_title; font-weight: 700; }
      .list_shortIntro{  overflow: hidden;text-overflow: ellipsis;display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:4; }}
    }
}

</style>
