<template>
  <div class="mask" @click.self="close">
    <transition name="slide">
      <div v-show="flag" class="menu">
        <div class="user" @click="user">
          <div class="avatar">
            <img :src="avatar" class="u-imgAuto">
          </div>
          <p>{{ userInfo&&userInfo.username||'请登录' }}</p>
        </div>
        <ul>
          <li>
            <router-link class="link" :to="{path:'/feedback'}">
              <icon name="Feedback" class="svg_menu u-cenInBlock" />
              <p class="u-cenInBlock">
                反馈建议
              </p>
            </router-link>
          </li>
          <li>
            <router-link class="link" :to="{path:'/setting'}">
              <icon name="Setting" class="svg_menu u-cenInBlock" />
              <p class="u-cenInBlock">
                我的设置
              </p>
            </router-link>
          </li>
        </ul>
        <div v-if="userInfo" class="out" @click="outLogin">
          <icon name="Out" class="svg_Out u-cenInBlock" />
          <p class="u-cenInBlock">
            退出登录
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import avatar from '@/assets/img/avatar.jpg'
import { RouterLink } from '@/utils/tools'
import { removeStorage } from '@/utils/storage'
import { mapGetters } from 'vuex'
export default {
  props: {
    flag: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      avatar: avatar
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    close () {
      this.$emit('menuClose')
    },
    user () {
      if (!this.userInfo) {
        RouterLink('/login')
      }
    },
    outLogin () {
      removeStorage('token')
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
.mask{ position: fixed; top: 0; left: 0; z-index: 111; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5);
  .menu{ position: absolute; left: 0; top: 0;  width: 60%; height: 100%; background: @font_col5;
    .user{ padding: 60/@rem 20/@rem 0; height: 280/@rem; font-size: @font_title2; background: url('~@/assets/img/menubg.jpg'); color: @font_col6;
      .avatar{ margin: 0 auto; width: 120/@rem; height: 120/@rem; margin-bottom: 20/@rem; border-radius: 50%; border: 2/@rem solid @font_col3;overflow: hidden; }
      p{ text-align: center; }
    }
    ul{ padding: 10/@rem 20/@rem;
      li{ height: 80/@rem; line-height: 80/@rem; font-size: @font_title;
        .link{ width: 100%; height: 100%; display: block; }
      }
    }
    .out{ padding: 40/@rem 20/@rem 0;border-top: 2/@rem solid @font_col4; }
    .svg_menu,.svg_Out{ width: 30/@rem; height: 30/@rem; margin-right: 20/@rem; }
  }
}
.slide-enter-active, .slide-leave-active {
  transition: all .5s;
}
.slide-enter, .slide-leave-to /* .slide-leave-active below version 2.1.8 */ {
  transform: translateX(-100%);
}
</style>
