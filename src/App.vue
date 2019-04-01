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
    if (getStorage('username')) {
      this.$store.dispatch('SetUserInfo', { username: window.atob(getStorage('username')) })
    }
  }
}
</script>

<style lang="less">
#app{ height: 100%; }
</style>
