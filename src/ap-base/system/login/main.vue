<style lang="less" src="./style.less"></style>
<template>
  <div
    id="ui_login"
    class=""
    :style="{ height: $store.state.min_height + 'px' }"
    v-loading.fullscreen.lock="getFullLoading"
  >
    <div class="ui_login_head">
      <img class="brand-logo" :src="$store.state.logo_src" />
      <div class="fr" v-if="is_i18n">
        <a
          @click="switchLanguage('zh')"
          class="pointer"
          v-if="$i18n.locale === 'en'"
          >中文</a
        >
        <a
          @click="switchLanguage('en')"
          class="pointer"
          v-if="$i18n.locale === 'zh'"
          >english</a
        >
      </div>
    </div>
    <div id="container_login">
      <div class="panel panel-default panel_login">
        <el-form
          label-position="top"
          :model="formLogin"
          ref="formLogin"
          label-width="100px"
          class="form-stacked modal-box"
        >
          <el-form-item
            prop="userAccount"
            :label="$t('login.label.usernameLabel')"
          >
            <el-input
              size="large"
              :placeholder="$t('login.label.username')"
              v-model="formLogin.userAccount"
              class="form-input"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="userPassword"
            :label="$t('login.label.passwordLabel')"
          >
            <el-input
              size="large"
              type="passWord"
              :placeholder="$t('login.label.password')"
              v-model="formLogin.userPassword"
              auto-complete="off"
              class="form-input"
              onpaste="return false;"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="verifyCode"
            :label="$t('login.label.verifyCodeLabel')"
            class="form-input login_code"
          >
            <el-input
              size="large"
              class="verification"
              :placeholder="$t('login.label.verifyCode')"
              v-model="formLogin.verifyCode"
            >
              <span
                slot="append"
                style="margin-left: -10px; margin-right: -11px"
                ><img height="34px" @click="verfyCodeSrcChange"
              /></span>
            </el-input>
          </el-form-item>
          <el-button
            type="primary"
            :disabled="loginDisabledStatus"
            @click.native.prevent="login"
            class="btn_login"
          >
            {{ $t('login.label.login') }}
          </el-button>
        </el-form>
      </div>
    </div>
    <div class="ui_login_copyright">
      <address>2009-2017 www.sinosoft.com.cn 中科软科技股份有限公司</address>
    </div>
  </div>
</template>

<script>
import _ from 'underscore';
import { mapGetters } from 'vuex';
import { Validate, lang as langUtils } from 'utils';
import md5 from 'md5';

export default {
  /* 组建名称 (非必填) */
  name: 'login',
  /* 计算属性将被混入到 Vue 实例中 */
  computed: _.extend(mapGetters(['getLoginInfo', 'getFullLoading']), {
    loginDisabledStatus: {
      get() {
        if (
          this.formLogin.userAccount &&
          this.formLogin.userAccount.trim() &&
          this.formLogin.verifyCode &&
          this.formLogin.verifyCode.trim() &&
          this.formLogin.userPassword &&
          this.formLogin.userPassword.trim()
        ) {
          return false;
        } else {
          return true;
        }
      }
    }
  }),
  /* 定义属性 */
  data() {
    return {
      title: G.title,
      is_i18n: G.is_i18n,
      formLogin: {
        userAccount: '',
        verifyCode: '',
        userPassword: ''
      },
      verifyCodeUrl: ''
    };
  },
  /* 生命周期-页面dome加载完成之前执行 */
  created() {
    if (!_.isEmpty(this.getLoginInfo)) {
      this.$router.push({ path: G.homePage });
    } else {
      this.initStyle();
    }
  },
  /* 生命周期-页面dome加载完成之后执行 */
  mounted() {
    var self = this;
    self.verfyCodeSrcChange();

    document.querySelector('#ui_login input').keydown((e) => {
      if (e.keyCode === 13) {
        self.login();
      }
      e.stopPropagation();
    });
  },
  /* 定义方法 */
  methods: {
    switchLanguage(lang) {
      langUtils.setLanguage(this, lang);
    },
    /** 验证码点击刷新 */
    verfyCodeSrcChange() {
      this.verifyCodeUrl =
        G.base_api + '/ap-system/UserLoginVerifyCode.do?index=' + Math.random();
      document
        .querySelector('#ui_login .verification img')
        .attr('src', this.verifyCodeUrl);
    },
    login() {
      var self = this;
      return self.$store
        .dispatch('login', {
          userAccount: self.formLogin.userAccount,
          userPassword: md5(self.formLogin.userPassword),
          verifyCode: self.formLogin.verifyCode,
          system_code: G.system_code
        })
        .then(() => {
          if (G.isRelyAPI) {
            self.$store.commit('SET_RESOURCE', []);
          }
          self.$router.push({ path: '/' });
        })
        .catch((error) => {
          self.verfyCodeSrcChange();
          self.$notify.error(
            typeof error === 'string' ? error : self.$t('login.msg.loginError')
          );
        });
    },
    initStyle() {
      var self = this;
      var min_height = String(document.documentElement.clientHeight);
      self.$store.dispatch('setMinHeight', min_height);

      /* $(window).resize(() => {
        min_height = String(document.documentElement.clientHeight);
        self.$store.dispatch('setMinHeight', min_height);
      }); */
    }
  }
};
</script>
