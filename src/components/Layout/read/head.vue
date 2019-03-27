<template>
  <div class="head">
    <div class="back" @click="back">
      <icon name="Back" class="svg_back u-cenInBlock" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$emit('GoBack')
    }
  }
}
</script>

<style lang="less" scoped>
.head{ width: 100%; height: 80/@rem; line-height: 80/@rem; background: rgba(0, 0, 0, 0.8); position: fixed; top: 0; z-index: 110; }
.svg_back{ width: 40/@rem; height: 40/@rem; margin-left: 10/@rem; color: @font_col6; }
</style>
