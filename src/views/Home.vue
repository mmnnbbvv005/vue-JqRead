<template>
  <div class="home">
    <BottomNav v-show="editFlag" />
    <bookhead :back-visible="false" :search-visible="false" :edit-visible="true" :mine-visible="true" :edit="editFlag" title="书架" @Onedit="changeEdit" @OnMine="menuToggle" />
    <ul class="booklist">
      <p v-if="booklist.length<=0" class="empty">
        暂无书籍，赶快去书城添加书籍吧！
      </p>
      <li v-for="(item,key) in booklist" :key="key" class="book">
        <router-link :to="{path:'/read/'+item.id}" class="book_link">
          <div class="img">
            <img :src="'http://statics.zhuishushenqi.com'+item.cover" :alt="item.item" class="u-imgAuto">
          </div>
          <p>{{ item.title }}</p>
          <div v-show="!editFlag" class="del" @click.prevent="selEdit(key)">
            <div class="mask">
              <span :class="item.sel?'sel':''">
                <icon v-show="item.sel" name="Gou" class="svg_Gou u-cenInBlock" />
              </span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <div v-show="!editFlag" class="editBtn">
      <button @click="selAll">
        全选
      </button>
      <button @click="del">
        删除
      </button>
    </div>
    <transition name="fade">
      <Menu v-show="menuFlag" :flag="menuFlag" @menuClose="menuToggle" />
    </transition>
  </div>
</template>

<script>
import { getStorage, setStorage } from '@/utils/storage'
import bookhead from '@/components/Layout/head/index.vue'
import BottomNav from '@/components/Layout/bottomNav/index'
import Menu from '@/components/Layout/menu/index'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  components: {
    BottomNav,
    bookhead,
    Menu
  },
  data () {
    return {
      booklist: [],
      editFlag: true,
      menuFlag: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted () {
    this.GetBooks()
  },
  methods: {
    GetBooks () {
      if (getStorage('mybooks') && Object.keys(getStorage('mybooks')).length > 0) {
        var list = getStorage('mybooks')
        for (const i in list) {
          list[i]['sel'] = false
        }
        this.booklist = list
      }
    },
    changeEdit () {
      this.editFlag = !this.editFlag
    },
    selEdit (index) {
      this.booklist[index].sel = !this.booklist[index].sel
    },
    selAll () {
      for (const i in this.booklist) {
        if (this.booklist.hasOwnProperty(i)) {
          this.booklist[i].sel = !this.booklist[i].sel
        }
      }
    },
    del () {
      for (const i in this.booklist) {
        if (this.booklist.hasOwnProperty(i)) {
          if (this.booklist[i]['sel']) {
            this.$delete(this.booklist, i)
            setStorage('mybooks', this.booklist)
          }
        }
      }
    },
    menuToggle () {
      this.menuFlag = !this.menuFlag
    }
  }
}
</script>

<style lang="less" scoped>
.home{  width: 100%; height: 100%; }
.booklist{  overflow: auto; background: #fff; height: calc(~"100% - 0.9rem"); height: -webkit-calc(~"100% - 0.9rem");height: -moz-calc(~"100% - 0.9rem");  }
.book{ position: relative; float: left;  margin-left: 45/@rem; margin-top: 20/@rem;
  .book_link{display: block;}
  .img{ height: 220/@rem; width: 154/@rem; border-radius: 10/@rem; overflow: hidden; }
  p{ margin-top: 10/@rem; text-align: center; font-size: @font_text2; color: @font_col7; }
  .del{ position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    .mask{ width: 100%; height: 220/@rem; background: rgba(0, 0, 0, 0.5); border-radius: 10/@rem; display: flex; justify-content: center; align-items: center;
      span{ width: 50/@rem; height: 50/@rem; border: 2/@rem solid @font_col3; border-radius: 50%; }
      .svg_Gou{ color: #fff; width: 50/@rem; height: 50/@rem; }}
      .sel{ background: @main_col1; }
  }
}
.editBtn{ position: absolute; bottom: 0; width: 100%; height: 100/@rem; line-height: 100/@rem; box-shadow: 0 0 10/@rem 5/@rem #ccc;  background: @font_col6; display: flex;
  button{ display: block; width: 50%; height: 100%; text-align: center; font-size: @font_text2; color: @main_col1;
    &:first-child{ border-right: 2/@rem solid @font_col4; color: #333; }}
}
.empty{ text-align: center; color: @font_col2; font-size: @font_text2; margin-top: 100/@rem; }
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
