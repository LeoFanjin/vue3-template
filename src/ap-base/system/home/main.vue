<!-- 首页 -->
<style lang="less" scoped src="./style.less"></style>

<template>
  <div id="ui_home" class="container-fluid">
    <!-- <p class="icon"><i class="icon iconfont icon-ap-smile"></i></p> -->
    <canvas id="clock" height="150px" width="150px"></canvas>
    <br />
    <p class="content">{{ $t('common.label.welcome') }}{{ title }}</p>
  </div>
</template>

<script>
// import clock from '../../components/clock';
export default {
  // mixins: [clock],
  data() {
    return {
      title: G.title
    };
  },
  mounted() {
    // this.initClock();
  }
};
</script>
