<template>
  <div class="classify">
    <BottomNav />
    <bookhead :back-visible="false" title="分类" />
    <div class="classNav">
      <p :class="Navindex=='male'?'active':''" @click="sel('male')">
        男生
      </p>
      <p :class="Navindex=='female'?'active':''" @click="sel('female')">
        女生
      </p>
      <p :class="Navindex=='press'?'active':''" @click="sel('press')">
        出版
      </p>
    </div>
    <div class="classifyList">
      <div class="list">
        <ul>
          <li v-for="(item,i) in List" :key="i" class="u-cenInBlock">
            <router-link :to="{path:'/classifyInfo',query:{major:item.name,gender:Navindex}}" class="link">
              <p class="title">
                {{ item.name }}
              </p>
              <p>({{ item.bookCount }}本)</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getClassify } from '@/api/classify'
import { Indicator } from 'mint-ui'
import bookhead from '@/components/Layout/head/index.vue'
import BottomNav from '@/components/Layout/bottomNav/index'
import { mapGetters } from 'vuex'
export default {
  name: 'classify',
  components: {
    BottomNav,
    bookhead
  },
  data () {
    return {
      List: [],
      male: [],
      female: [],
      press: [],
      Navindex: 'male'
    }
  },
  computed: {
    ...mapGetters(['classifyIndex', 'classifyList'])
  },
  mounted () {
    if (this.classifyIndex !== null && this.classifyList) {
      this.Navindex = this.classifyIndex
      this.male = this.classifyList.male
      this.female = this.classifyList.female
      this.press = this.classifyList.press
      this.sel(this.classifyIndex)
    } else {
      this.GetClassify()
    }
  },
  methods: {
    GetClassify () {
      Indicator.open({
        text: '加载中……',
        spinnerType: 'double-bounce'
      })
      getClassify().then(res => {
        Indicator.close()
        this.male = res.data.male
        this.female = res.data.female
        this.press = res.data.press
        this.List = res.data.male
        this.$store.dispatch('SetClassifyIndex', this.Navindex)
        this.$store.dispatch('SetClassifyList', { male: res.data.male, female: res.data.female, press: res.data.press })
      })
    },
    sel (index) {
      this.Navindex = index
      this.$store.dispatch('SetClassifyIndex', index)
      switch (index) {
      case 'male':
        this.List = this.male
        break
      case 'female':
        this.List = this.female
        break
      case 'press':
        this.List = this.press
        break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.classNav{ position: fixed;top: 80/@rem; z-index: 112; width: 100%; height: 80/@rem; line-height: 80/@rem; display: flex; justify-content: space-around; background: @font_col6;
  p{ position: relative; width: 33%; text-align: center; }
  .active{ color: @main_col1;
    &::after{ position: absolute; bottom: 0; content: ""; display: block; width: 100%; height: 3/@rem; background: @main_col1;  }}
}
.classifyList{ padding: 20/@rem; margin-bottom: 100/@rem; margin-top: 80/@rem; background: #fafafa;
  div{
    ul{ display: flex; justify-content: space-around; flex-wrap: wrap; }
    li{ height: 100/@rem; width:260/@rem;  border: 2/@rem solid #ccc;background: @font_col6; margin-top: 20/@rem; text-align: center;
    }
  }
}
.title{ font-size: @font_ord; font-weight: 700; color: @font_col1; }
.link{ display: block; width: 100%; height: 100%; line-height: 35/@rem; font-size: @font_text; color: @font_col3;  padding-top: 15/@rem;}
</style>
