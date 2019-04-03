<template>
  <div class="login">
    <p class="title">
      账号登录
    </p>
    <div class="form">
      <form method="post">
        <input v-model="username" type="text" placeholder="请输入用户名">
        <input v-model="password" type="password" placeholder="请输入密码">
        <input type="button" :disabled="disabled" class="submit elAct" :class="disabled?'disabled':''" value="登录" @click="login">
      </form>
      <div class="tip">
        <p>忘记密码</p>
        <p @click="openRegister">
          立即注册
        </p>
      </div>
    </div>
    <transition name="fade">
      <register v-if="regVisible" @Onclose="closeRegister" />
    </transition>
  </div>
</template>

<script>
import register from '@/views/login/register'

import { Toast } from 'mint-ui'
import { login } from '@/api/login'
import { mapGetters } from 'vuex'
import { getStorage, setStorage } from '@/utils/storage'
export default {
  components: {
    register
  },
  data () {
    return {
      username: '',
      password: '',
      disabled: false,
      regVisible: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted () {
    if (getStorage('token')) {
      this.$router.replace('/home')
    }
  },
  methods: {
    login () {
      var _this = this
      if (this.disabled) return
      this.disabled = true
      login({ username: this.username, password: this.password }).then(function (data) {
        _this.disabled = false
        if (data.data.status) {
          Toast(data.data.message)
          setStorage('token', data.data.token)
          _this.$store.dispatch('SetUserInfo', { login: true })
        } else {
          Toast(data.data.message)
        }
      })
    },
    openRegister () {
      this.regVisible = true
    },
    closeRegister () {
      this.regVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.login{ padding: 40/@rem; }
.title{ font-size: @font_big; margin-top: 150/@rem; color: @main_col2; }
.form{ margin-top: 100/@rem;
  input{ margin-top: 20/@rem; display: block; width:100%; height: 80/@rem; line-height: 80/@rem; text-indent: 10/@rem; font-size: @font_ord; color: @font_col2; border-bottom: 2/@rem solid @font_col4;  }
  .submit{ margin-top: 40/@rem; border: none; background: @main_col2; text-indent: 0; border-radius: 50/@rem; color: @font_col6; }
  .disabled{ background: @font_col3; }
}
.tip{ margin-top: 40/@rem; font-size: @font_text; color: @main_col2; display: flex; justify-content: space-between; }
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
