<style scoped lang="less" src="./style.less"></style>

<template>
  <div id="ap_personal" class="container-fluid">
    <div class="leftDiv col-xs-3">
      <div
        class="content"
        :style="{
          height:
            $store.state.min_height -
            $store.state.base_height_difference +
            40 +
            'px'
        }"
      >
        <ul class="user_info_menu">
          <li
            @click="goPage('/personal/userInfo')"
            :class="{ active: $route.path === '/personal/userInfo' }"
          >
            <i class="icon iconfont icon-ap-user"></i>&nbsp;
            {{ $t('head.label.user_info') }}
          </li>
          <li
            @click="goPage('/personal/head')"
            :class="{ active: $route.path === '/personal/head' }"
          >
            <i class="icon iconfont icon-ap-head"></i>&nbsp;
            {{ $t('userHead.label.head') }}
          </li>
          <li
            @click="goPage('/personal/securitySetting')"
            :class="{ active: $route.path === '/personal/securitySetting' }"
          >
            <i class="icon iconfont icon-ap-lock"></i>&nbsp;
            {{ $t('head.label.security_setting') }}
          </li>
          <li
            @click="goPage('/personal/myAuth')"
            :class="{ active: $route.path === '/personal/myAuth' }"
          >
            <i class="icon iconfont icon-ap-auth"></i>&nbsp;
            {{ $t('head.label.my_auth') }}
          </li>
        </ul>
      </div>
    </div>
    <div class="rightDiv col-xs-9">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goPage(page) {
      if (page) {
        this.$router.push(page);
      }
    }
  }
};
</script>
