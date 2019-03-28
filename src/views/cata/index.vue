/* 章节列表 */
<template>
  <div class="cata">
    <bookhead :title="title" />
    <div class="cata_head">
      <p>{{ title }}</p>
      <div class="inversion">
        <span @click="inversion">
          {{ inversioFlag?'逆序':'正序' }}
        </span>
      </div>
    </div>
    <div class="cate_content">
      <ul class="cata_ul">
        <li v-for="(item,i) in cataList" :key="i" class="cata_list">
          <router-link :to="{name:'read',query:{Chapter:inversioFlag?i:cataList.length-1-i,lastChapter: $route.query.lastChapter, title: title, source: $route.query.source},params:{id:$route.params.id}}" class="cata_link txt-ellipsis">
            {{ item.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getChapters } from '@/api/book'
import { Indicator } from 'mint-ui'
import bookhead from '@/components/Layout/head/index.vue'
export default {
  name: 'Cata',
  components: {
    bookhead
  },
  data () {
    return {
      title: '',
      cataList: [],
      inversioFlag: true
    }
  },
  mounted () {
    var query = this.$route.query
    this.GetCata(query.source)
    this.title = query.title
  },
  methods: {
    GetCata (id) {
      Indicator.open({
        text: '加载中……',
        spinnerType: 'double-bounce'
      })
      getChapters(id).then(res => {
        Indicator.close()
        this.cataList = res.data.chapters
      })
    },
    inversion () {
      this.inversioFlag = !this.inversioFlag
      this.cataList = this.cataList.reverse()
    }
  }
}
</script>

<style lang="less" scoped>
.cata_head{ position: fixed; top: 80/@rem; padding:30/@rem 20/@rem 20/@rem ; width: 100%; background: #fff; font-size: @font_title; display: flex; justify-content: space-between; }
.inversion{ font-size: @font_ord; }
.cate_content{ margin-top:90/@rem;  padding: 10/@rem 20/@rem; }
.cata_ul{ margin-top: 10/@rem; background: #fff; padding: 0 20/@rem;
  .cata_list{ height: 80/@rem;line-height: 80/@rem; border-bottom: 1px solid #ccc; color: @font_col2; }}
.cata_link{ display: block; width: 100%; height: 100%; }
</style>
