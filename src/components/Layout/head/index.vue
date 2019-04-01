/* 布局头部 */
<template>
  <div class="frame">
    <div class="emty" />
    <div class="head">
      <div v-if="backVisible" class="back" @click="back">
        <icon name="Back" class="svg_back u-cenInBlock" />
      </div>
      <div v-if="mineVisible" class="Mine" @click="mine">
        <icon name="Mine" class="svg_Mine u-cenInBlock" />
      </div>
      <div class="head_title">
        {{ title }}
      </div>
      <div v-if="searchVisible" class="search" @click="search">
        <icon name="Search" class="svg_search u-cenInBlock" />
      </div>
      <div v-show="editVisible" class="edit" @click="changeEdit">
        {{ edit?'编辑':'完成' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backVisible: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '津桥书居'
    },
    searchVisible: {
      type: Boolean,
      default: true
    },
    mineVisible: {
      type: Boolean,
      default: false
    },
    editVisible: {
      type: Boolean,
      default: false
    },
    edit: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    search () {
      this.$router.push('/search')
    },
    changeEdit () {
      this.$emit('Onedit')
    },
    mine () {
      this.$emit('OnMine')
    }
  }
}
</script>

<style lang="less" scoped>
.head{ width: 100%; max-width: 640/@rem; height: 80/@rem; line-height: 80/@rem; background: @font_col6; font-weight: bold; font-family: KaiTi; position: fixed; top: 0; z-index: 110; box-shadow: 0 0 10/@rem 0/@rem @font_col3;
  div{ position: absolute; }
  .head_title{ left: 50%; transform: translateX(-50%); }
  .back,.Mine{ left: 20/@rem; }
  .search,.edit{ right: 20/@rem; }
  }
.head_title{ font-size: @font_title; }
.svg_back,.svg_search,.svg_Mine{ width: 40/@rem; height: 40/@rem; }
.emty{ height: 80/@rem; width: 100%; }
</style>
