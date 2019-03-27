<template>
  <div class="read_setting">
    <ul class="setting_ul">
      <li>
        <p>
          字号
        </p>
        <ul>
          <li class="font_minus" @click="fontMinus">
            A--
          </li>
          <li class="font_now">
            {{ fontSize }}
          </li>
          <li class="font_add" @click="fontAdd">
            A++
          </li>
        </ul>
      </li>
      <li>
        <p>
          背景
        </p>
        <ul class="read_bg">
          <li v-for="(item,i) in background" :key="i" class="u-cenInBlock" :style="'background:'+item.background+';color:'+item.color+';'" @click="changeTheme(item)" />
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    fontSize: {
      type: Number,
      default: 34
    }
  },
  data () {
    return {
      background: [
        { color: '#000', background: '#FAF9DE' },
        { color: '#000', background: '#e9faff' },
        { color: '#000', background: '#eefaee' },
        { color: '#000', background: '#C7EDCC' },
        { color: '#000', background: '#d2b48c' }
      ]
    }
  },
  methods: {
    fontAdd () {
      this.$parent.fontSize += 2
    },
    fontMinus () {
      this.$parent.fontSize -= 2
    },
    changeTheme (theme) {
      this.$parent.theme = theme
    }
  }
}
</script>

<style lang="less" scoped>
.read_setting{ position: fixed; bottom: 0; width: 100%;background: rgba(0, 0, 0, 0.8); color: #eee; font-size: @font_text2; padding: 10/@rem 20/@rem;
  .setting_ul>li{ display: flex; margin: 20/@rem 0; height: 50/@rem; line-height: 50/@rem;
    p{  flex: 1; }
    ul{ display: flex; flex: 6; }
    li{border: 2/@rem solid #666; text-align: center; display: block;}
    .font_minus,.font_add{ width: 200/@rem; }
    .font_now{ width: 80/@rem; }
    }
    .read_bg li{ border-radius: 50%; width: 50/@rem; margin-right: 20/@rem; }
}
</style>
