<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { screenAdaptation } from './utils/tools'
export default {
  mounted () {
    screenAdaptation()
    if ('onorientationchange' in window) {
      window.addEventListener('resize', screenAdaptation, false)
    } else {
      window.addEventListener('resize', function () {
        screenAdaptation()
      }, false)
    }
  }
}
</script>

<style lang="less">
#app{ height: 100%; }
</style>
