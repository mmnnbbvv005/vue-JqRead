<template>
  <div>
    <bookhead title="反馈建议" :search-visible="false" />
    <div class="content">
      <div class="form">
        <p>请描述您的问题</p>
        <textarea v-model="question" cols="50" rows="10" class="ipt" placeholder="请输入您想要反馈的内容！" />
        <p>您的联系方式</p>
        <textarea v-model="QQ" cols="50" rows="3" class="ipt" placeholder="请输入您的QQ号！" />
      </div>
    </div>
    <div class="footer">
      <button>提交反馈</button>
    </div>
  </div>
</template>

<script>
import bookhead from '@/components/Layout/head/index.vue'
export default {
  components: {
    bookhead
  },
  data () {
    return {
      question: '',
      QQ: ''
    }
  }
}
</script>

<style lang="less" scoped>
.content{ margin-top: 20/@rem; padding: 20/@rem;
  .form{
    p{ font-size: @font_text2; color: @font_col2;
      &::before{ content: ""; display: inline-block; margin-right: 10/@rem; width: 10/@rem; height: 10/@rem; background: @main_col1; border-radius: 50%; vertical-align: middle;  }}
    .ipt{ padding: 20/@rem; border: 2/@rem solid @font_col4; width: 100%; margin: 20/@rem 0;resize:none; }
  }
}
.footer{ position: absolute; bottom: 0; left: 0; width: 100%; height: 80/@rem; background: @main_col1; text-align: center; line-height: 80/@rem;
  button{ width: 100%; height: 100%;  color: @font_col6; font-size: @font_title; }
}
</style>
