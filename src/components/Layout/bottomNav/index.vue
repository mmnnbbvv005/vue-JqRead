<template>
  <div class="TopNav">
    <router-link to="/home" class="TopNav_link">
      <icon name="Book" class="svg_Nav u-cenInBlock" />
      <p>书架</p>
    </router-link>
    <router-link to="/rank" class="TopNav_link">
      <icon name="Rank" class="svg_Nav u-cenInBlock" />
      <p>排行</p>
    </router-link>
    <router-link to="/search" class="TopNav_link">
      <icon name="Search" class="svg_Nav u-cenInBlock" />
      <p>搜索</p>
    </router-link>
    <router-link to="/classify" class="TopNav_link">
      <icon name="Class" class="svg_Nav u-cenInBlock" />
      <p>分类</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TopNav'
}
</script>

<style lang="less" scoped>
.TopNav{ width: 100%; max-width: 640/@rem; height: 100/@rem; padding-top: 20/@rem; background: #fff; box-shadow: 0 0 10/@rem 5/@rem #ccc; position: fixed; bottom: 0; z-index: 10; display: flex; justify-content: space-around;
  .TopNav_link{text-align: center; width: 100%; height: 100%; font-size: @font_text2; }}
.router-link-active{ color: @main_col1; }
.svg_Nav{width: 40/@rem; height: 40/@rem; }
</style>
