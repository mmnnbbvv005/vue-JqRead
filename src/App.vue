<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { screenAdaptation } from './utils/tools'
import { getStorage } from '@/utils/storage'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted () {
    screenAdaptation()
    if ('onorientationchange' in window) {
      window.addEventListener('resize', screenAdaptation, false)
    } else {
      window.addEventListener('resize', function () {
        screenAdaptation()
      }, false)
    }
    if (getStorage('token')) {
      this.$store.dispatch('SetUserInfo', { login: false })
    }
  }
}
</script>

<style lang="less">
#app{ height: 100%; }
</style>
