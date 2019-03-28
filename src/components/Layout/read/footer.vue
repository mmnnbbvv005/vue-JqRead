<template>
  <div class="read_foot">
    <ul class="chapter">
      <li @click="prevChapter">
        上一章
      </li>
      <li>{{ chapter+1 }}/{{ allChapter+1 }}</li>
      <li @click="nextChapter">
        下一章
      </li>
    </ul>
    <ul>
      <li @click="openChapter">
        目录
      </li>
      <li @click="changeLight">
        {{ light?'夜间':'白天' }}
      </li>
      <li @click="couple">
        反馈
      </li>
      <li @click="openSetting">
        设置
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    chapter: {
      type: Number,
      default: 0
    },
    allChapter: {
      type: Number,
      default: 0
    },
    source: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    light: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    prevChapter () {
      this.$emit('PrevChapt')
    },
    nextChapter () {
      this.$emit('NextChapt')
    },
    changeLight () {
      this.$parent.light = !this.$parent.light
    },
    openSetting () {
      this.$parent.headflag = false
      this.$parent.settingflag = true
    },
    couple () {
      this.$parent.popupVisible = true
    },
    openChapter () {
      this.$emit('Chapter')
    }
  }
}
</script>

<style lang="less" scoped>
.read_foot{ width: 100%; position: fixed; bottom: 0; background: rgba(0, 0, 0, 0.8);
 ul{ display: flex; width: 100%; height: 80/@rem; }
  li{ flex: 1; text-align: center; font-size: @font_title2; line-height: 80/@rem; color: @font_col6;
  .cataLink{ display: block; width: 100%; height: 100%; color: @font_col6; font-size: @font_title2; }}}
</style>
