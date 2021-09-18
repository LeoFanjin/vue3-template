<style scoped>
#errorTip {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  background-position: 50% 50%;
  background-size: cover;
  overflow-x: hidden;
}
</style>
<template>
  <div id="errorTip" align="center">
    <div style="width: 582px; height: 300px; margin-top: 6%" align="center">
      <div style="font-size: 25px; color: #fff">非常抱歉,请升级您的浏览器</div>
      <div style="font-size: 15px; color: #fff; line-height: 40px">
        您当前浏览器版本过低,为了给您更好的体验,我们需要更高级的浏览器支持
      </div>
      <div style="margin-top: 48px">
        <div style="width: 194px; float: left" align="center">
          <a
            target="_blank"
            href="https://www.baidu.com/link?url=Uw8r5dGgrWQsdvR_H-DTl4UOE2zPbZOqaLuqkKSylFMduwysYNNKk6_Qb7iDn2wm3leGkoKAATJiPcm2tfFo1wb6H0_ji3hmzWHf3w5oqwS&wd=&eqid=d7433ab400005ac4000000025875d152"
            ><img
              style="height: 80px; width: 80px"
              src="/dist/vendor/image/google.png"
          /></a>
        </div>
        <div style="width: 194px; float: left" align="center">
          <a
            target="_blank"
            href="https://www.baidu.com/link?url=7jI1EaI5NlTRdurJPSz9ZT-JWPTCjopcJj6h5lwAcKyF2mjibZJp4Sdcz8D57BGMO9pYXy8Ah4sIg8lB1vOkSlLMz2gmKG8BwINHPNXummK&wd=&eqid=f20ff26b00006208000000025875d1c0"
            ><img
              style="height: 80px; width: 80px"
              src="/dist/vendor/image/firefox.png"
          /></a>
        </div>
        <div style="width: 194px; float: left" align="center">
          <a
            target="_blank"
            href="https://www.baidu.com/link?url=YrYp6JhZ8RJVQs6bdFh7RwxFWSLWUcHiz9WH6_pbCmashBoNL7I2y7VzXSuFn7_GccOQI8K9K2iiBAMJ0Jk1dDhCAVBoENQWCrzLXWVWEqC&wd=&eqid=b7927e5f00007697000000025875d223"
            ><img
              style="height: 80px; width: 80px"
              src="/dist/vendor/image/ie10.png"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    if (
      navigator.userAgent.indexOf('MSIE') >= 0 &&
      navigator.userAgent.indexOf('Opera') < 0
    ) {
      var ua = navigator.userAgent;
      var s = 'MSIE';
      var i = ua.indexOf(s);
      var ver = parseFloat(ua.substr(i + s.length));

      if (ver == 8 || ver == 7 || ver == 6 || ver == 5) {
        document.querySelector('#errorTip').show();
        document.querySelector('#app').hide();
      } else {
        document.querySelector('#errorTip').hide();
        document.querySelector('#app').show();
      }
    }
  }
};
</script>
