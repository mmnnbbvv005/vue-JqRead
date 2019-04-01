<template>
  <div class="mask">
    <div class="register">
      <p class="title">
        注册
      </p>
      <div class="close" @click="close">
        <icon name="Close" class="svg_Close" />
      </div>
      <div class="form">
        <form method="post">
          <div class="username">
            <input v-model="username" type="text" placeholder="请输入用户名" :class="userErr?'error':''" @blur="blur(username,1)" @focus="userErr=false">
            <p v-if="userErr">
              {{ message }}
            </p>
          </div>
          <div class="password">
            <input v-model="password" type="password" placeholder="请输入密码" :class="passwordErr?'error':''" @blur="blur(password,2)" @focus="passwordErr=false">
            <p v-if="passwordErr">
              {{ message }}
            </p>
          </div>
          <div class="regpassword">
            <input v-model="regpassword" type="password" placeholder="请再次确认密码" :class="regpasswordErr?'error':''" @blur="blur(regpassword,3)" @focus="regpasswordErr=false">
            <p v-if="regpasswordErr">
              {{ message }}
            </p>
          </div>
          <input type="button" :disabled="disabled" class="submit elAct" :class="disabled?'disabled':''" value="注册" @click="verify">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { register } from '@/api/login'
export default {
  data () {
    return {
      username: '',
      password: '',
      regpassword: '',
      passwordErr: false,
      userErr: false,
      regpasswordErr: false,
      disabled: false,
      message: ''
    }
  },
  methods: {
    register () {
      var _this = this
      if (this.disabled) return
      this.disabled = true
      register({ username: this.username, password: this.password }).then(function (data) {
        _this.disabled = false
        if (data.status) {
          if (data.data.status) {
            Toast(data.data.message)
            _this.close()
          } else {
            _this.userErr = true
            _this.message = '用户名已存在'
            // Toast('注册失败,用户名已存在')
          }
        }
      })
    },
    verify () {
      if (this.username === '' || this.password === '' || this.regpassword === '') {
        alert('账号或密码不能为空')
        return false
      }
      if (!this.blur(this.username, 1) || !this.blur(this.password, 2) || !this.blur(this.regpassword, 3)) return
      this.register()
    },
    regular (obj) {
      var user = /^[a-zA-Z0-9_-]{4,16}$/
      var pw = /^[a-zA-Z]\w{5,17}$/
      var data = { flag: true }
      if (obj['username'] && !user.test(obj['username'])) {
        data.userMessage = '用户名格式错误'
        data.flag = false
      }
      if (obj['password'] && !pw.test(obj['password'])) {
        data.pwMessage = '密码格式错误'
        data.flag = false
      }
      return data
    },
    blur (value, i) {
      if (i === 1) {
        if (!this.regular({ username: value }).flag) {
          this.userErr = true
          this.message = this.regular({ username: value }).userMessage
          return false
        }
      } else if (i === 2) {
        if (!this.regular({ password: value }).flag) {
          this.passwordErr = true
          this.message = this.regular({ password: value }).pwMessage
          return false
        }
      } else {
        if (value !== this.password) {
          this.regpasswordErr = true
          this.message = '密码不一致'
          return false
        }
      }
      return true
    },
    close () {
      this.$emit('Onclose')
    }
  }
}
</script>

<style lang="less" scoped>
.mask{ position: absolute; width: 100%; height: 100%; top: 0;left: 0; background: rgba(0, 0, 0, 0.5) }
.register{ position: absolute; left:50%;transform: translateX(-50%); top: 200/@rem;padding: 20/@rem; height: 530/@rem; width: 600/@rem; background: @font_col6; border-radius: 15/@rem;
  .title{ color: @main_col2; font-size: @font_title2; }
  .svg_Close{ position: absolute; top: 20/@rem; right: 20/@rem; color: @font_col2; width: 40/@rem; height: 40/@rem; }
  .form{ margin-top: 20/@rem;
    div{position: relative;
      p{  position: absolute; right: 10/@rem; top: 50%; transform: translateY(-50%); font-size: @font_text; color: @warning_col; }}
    input{ margin-top: 20/@rem; display: block; width:100%; height: 80/@rem; line-height: 80/@rem; text-indent: 10/@rem; font-size: @font_ord; color: @font_col2; border-bottom: 2/@rem solid @font_col4;  }
    .submit{ margin-top: 40/@rem; border: none; background: @main_col2; text-indent: 0; border-radius: 50/@rem; color: @font_col6; }
    .disabled{ background: @font_col3; }
    .error{ border: 2/@rem solid @warning_col; }
  }
}
</style>
