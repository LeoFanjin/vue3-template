<style scoped>
#page_404 * {
  margin: 0;
  padding: 0;
  outline: none;
  font-family: \5fae\8f6f\96c5\9ed1, 宋体;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  cursor: default;
  font-weight: lighter;
}
#page_404 .error-tip {
  padding-top: 80px;
  background-color: #fff;
  width: 470px;
  height: 400px;
  text-align: center;
  box-shadow: 5px 5px 5px #ccc;
  margin: 5% auto 0;
}
#page_404 .error-tip .not-find {
  font-size: 30px;
  color: #ff9e2a;
  font-weight: 400;
}
#page_404 .error-tip ul li {
  display: inline-block;
  font-size: 115px;
}
#page_404 .error-tip .error-msg {
  width: 270px;
  font-size: 12px;
  margin: 0 auto;
  text-align: left;
}
#page_404 .back-home {
  font-size: 18px;
  color: #000;
  text-align: center;
  margin-top: 30px;
}
#page_404 .back-home a {
  font-weight: bold;
  color: #000;
  cursor: pointer;
}
</style>
<template>
  <div id="page_404">
    <div class="error-tip">
      <span class="not-find">找不到该页面！</span><br />
      <ul>
        <li style="margin-right: -20px">
          <i class="icon iconfont icon-ap-four"></i>
        </li>
        <li><i class="icon iconfont icon-ap-cry"></i></li>
        <li style="margin-left: -20px">
          <i class="icon iconfont icon-ap-four"></i>
        </li>
      </ul>
      <div class="error-msg">
        您使用的url可能拼写有误，该页面可能已经移动，或者他可能只是临时脱机
      </div>
    </div>
    <div class="back-home">
      <span>返回&nbsp;<a @click="goHome">首页</a></span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push({ path: '/home' });
    }
  }
};
</script>
