<style scoped lang="less" src="./style.less"></style>

<template>
  <div id="ui_release" class="container-fluid">
    <div
      class="panel"
      :style="{
        height:
          this.$store.state.min_height -
          $store.state.base_height_difference +
          'px'
      }"
    >
      <div class="panel-heading">
        <h2 class="panel-title">版本信息</h2>
      </div>
      <div class="panel-body">
        <p class="release">版本号&nbsp;{{ release }}</p>
        <p class="come-from">{{ comeFrom }}&nbsp;版权所有</p>
        <p>©ALIMAMA MUX, powered by alimama THX</p>
        <p>官方网址：{{ url }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      release: '6.0.0.8000',
      comeFrom: '中科软股份有限公司',
      url: 'http://www.sinosoft.com.cn/'
    };
  }
};
</script>
