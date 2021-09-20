<style lang="less" src="./style.less"></style>
<template>
  <div
    id="ui_login"
    class=""
    :style="{ height: store.state.min_height + 'px' }"
    v-loading.fullscreen.lock="getFullLoading"
  >
    <div class="ui_login_head">
      <img class="brand-logo" :src="store.state.logo_src" />
      <div class="fr" v-if="isI18n">
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
          ref="loginFormRef"
          label-width="100px"
          class="form-stacked modal-box"
        >
          <el-form-item
            prop="userAccount"
            :label="t('login.label.usernameLabel')"
          >
            <el-input
              size="large"
              :placeholder="t('login.label.username')"
              v-model="formLogin.userAccount"
              @keyup.enter="login"
              class="form-input"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="userPassword"
            :label="t('login.label.passwordLabel')"
          >
            <el-input
              size="large"
              type="passWord"
              :placeholder="t('login.label.password')"
              v-model="formLogin.userPassword"
              auto-complete="off"
              @keyup.enter="login"
              class="form-input"
              onpaste="return false;"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="verifyCode"
            :label="t('login.label.verifyCodeLabel')"
            class="form-input login_code"
          >
            <el-input
              size="large"
              class="verification"
              :placeholder="t('login.label.verifyCode')"
              v-model="formLogin.verifyCode"
              @keyup.enter="login"
            >
              <template #append>
                <span style="margin-left: -10px; margin-right: -11px"
                  ><img @click="verfyCodeSrcChange"
                /></span>
              </template>
            </el-input>
          </el-form-item>
          <el-button
            type="primary"
            :disabled="loginDisabledStatus"
            @click.prevent="login"
            class="btn_login"
          >
            {{ t('login.label.login') }}
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
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  computed,
  onMounted
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore, mapGetters } from 'vuex';
import { useI18n } from 'vue-i18n';
import { lang as langUtils } from 'utils';
import md5 from 'md5';
import { ElNotification } from 'element-plus';

export default defineComponent({
  /* 组建名称 (非必填) */
  name: 'login',
  setup() {
    /* router, store, i18n */
    const router = useRouter(),
      store = useStore(),
      i18n = useI18n(),
      { t } = i18n;

    /* data */
    const loginFormRef = ref();
    const isI18n = ref(G.is_i18n);
    const state = reactive({
      formLogin: {
        userAccount: '',
        verifyCode: '',
        userPassword: ''
      }
    });

    /* computed */
    const getLoginInfo = computed(() => {
      mapGetters(['getLoginInfo']);
    });
    const getFullLoading = computed(() => {
      mapGetters(['getFullLoading']);
    });
    const loginDisabledStatus = computed(() => {
      if (
        state.formLogin.userAccount &&
        state.formLogin.userAccount.trim() &&
        state.formLogin.verifyCode &&
        state.formLogin.verifyCode.trim() &&
        state.formLogin.userPassword &&
        state.formLogin.userPassword.trim()
      ) {
        return false;
      } else {
        return true;
      }
    });

    /* methods */
    /** 验证码点击刷新 */
    const verfyCodeSrcChange = () => {
      let verifyCodeUrl =
        G.base_api + '/ap-system/UserLoginVerifyCode.do?index=' + Math.random();
      const imgEle = document.querySelector('#ui_login .verification img');
      imgEle.setAttribute('src', verifyCodeUrl);
    };

    /* 初始化高度变量 */
    const initStyle = () => {
      let min_height = String(document.documentElement.clientHeight);
      store.dispatch('setMinHeight', min_height);

      window.onresize = () => {
        min_height = String(document.documentElement.clientHeight);
        store.dispatch('setMinHeight', min_height);
      };
    };

    /* 切换语言 */
    const switchLanguage = (lang) => {
      langUtils.setLanguage(i18n, lang);
    };

    /* 登录 */
    const login = () => {
      store
        .dispatch('login', {
          userAccount: state.formLogin.userAccount,
          userPassword: md5(state.formLogin.userPassword),
          verifyCode: state.formLogin.verifyCode,
          system_code: G.system_code
        })
        .then(() => {
          if (G.isRelyAPI) {
            store.commit('SET_RESOURCE', []);
          }
          router.push({ path: '/' });
        })
        .catch((error) => {
          verfyCodeSrcChange();
          ElNotification.error(
            typeof error === 'string' ? error : t('login.msg.loginError')
          );
        });
    };

    /* mounted */
    onMounted(() => {
      verfyCodeSrcChange();
    });

    if (!_.isEmpty(getLoginInfo.value)) {
      router.push({ path: G.homePage });
    } else {
      initStyle();
    }

    return {
      isI18n,
      loginFormRef,
      ...toRefs(state),
      store,
      loginDisabledStatus,
      getFullLoading,
      switchLanguage,
      verfyCodeSrcChange,
      login,
      t
    };
  }
});
</script>
