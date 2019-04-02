<template>
  <div>
    <bookhead title="我的设置" :search-visible="false" />
    <p>没什么好设置的</p>
  </div>
</template>

<script>
import bookhead from '@/components/Layout/head/index.vue'
export default {
  components: {
    bookhead
  }
}
</script>

<style lang="less" scoped>
p{text-align: center; margin-top: 50/@rem;}
</style>
