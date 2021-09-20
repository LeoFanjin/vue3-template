<style>
.app-head__manual {
  height: 36px;
  line-height: 36px;
  color: #000000;
  font-size: 14px;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.app-head__manual:hover {
  background-color: lightskyblue;
}
.app-head__manual a {
  text-decoration: none;
  cursor: pointer;
}
</style>
<template>
  <!-- HEADER -->
  <div class="app-head">
    <div class="app-side-nav__brand" @click="goPage('/home')">
      <img class="brand-logo" v-if="showLogo" :src="store.state.logo_src" />
      <strong class="brand-name" v-if="!showLogo">{{ title }}</strong>
    </div>
    <ul class="app-head__actions">
      <li class="message profile-name" style="cursor: auto; max-width: 250px">
        <img
          :src="getLoginInfo?.userHeadAddress"
          class="img-circle"
          style="display: inline-block"
        />
        <span :title="store.state.loginInfo.userName"
          >&nbsp;{{ store.state.loginInfo.userName }}</span
        >
        <div class="head_divide_line"></div>
        <!-- <img v-if="isShowSystemHead" :src="getLoginInfo.userHeadAddress" class="img-circle"> -->
        <!-- <img v-if="!isShowSystemHead" :src="defaultImg[0].src" class="img-circle"> -->
      </li>
      <!-- <li class="link" v-popover:popover4 v-if="manualAddress&&manualAddress.length>0">
        <a class="download-link">
          <span :title="下载用户使用手册">下载</span>
        </a>
        <div class="head_divide_line"></div>
        <el-popover
          ref="popover4"
          placement="bottom"
          width="300"
          trigger="click">
          <div class="app-head__manual" v-for="item in manualAddress">
            <a :title="item.docName" :href="item.address" :download="item.address"><span>{{item.docName}}</span></a>
          </div>
        </el-popover>
      </li> -->
      <li v-if="showHome" class="link" @click="goPortal">
        <a class="home-prominent"
          ><i class="icon iconfont icon-ap-homepage"></i
        ></a>
        <div class="head_divide_line"></div>
      </li>
      <li
        v-for="item in getLinkResource"
        :key="item.id"
        :class="{ active: item.isActive }"
        class="message"
        @click="clickLinkResource(item)"
      >
        <a>
          <i v-if="item.icon" class="icon iconfont" :class="item.icon"></i>
          <span v-else>{{ item.name }}</span>
        </a>
        <div class="head_divide_line"></div>
      </li>
      <!-- <el-tooltip class="item" effect="dark" content="版本信息" placement="top-start">
        <li class="link" @click="goPage('/releaseMessage')">
          <a><i class="icon iconfont icon-ap-version"></i></a>
          <div class="head_divide_line"></div>
        </li>
      </el-tooltip>-->
      <li class="link" @click="userLogout">
        <a><i class="icon iconfont icon-ap-logout"></i></a>
        <div class="head_divide_line"></div>
      </li>
    </ul>
  </div>
  <!-- END HEADER -->
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';
import _s from 'underscore.string';
import { logout, cookie, resource as resourceUtil } from 'utils';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 's_head',
  /* data() {
    return {
      defaultImg: [
        {
          src: '../static/image/head/default/bp_boy_1.png',
          active: false,
          id: 1
        },
        {
          src: '../static/image/head/default/bp_boy_2.png',
          active: false,
          id: 2
        },
        {
          src: '../static/image/head/default/bp_boy_3.png',
          active: false,
          id: 3
        },
        {
          src: '../static/image/head/default/bp_girl_1.png',
          active: false,
          id: 4
        },
        {
          src: '../static/image/head/default/bp_girl_2.png',
          active: false,
          id: 5
        },
        {
          src: '../static/image/head/default/bp_girl_3.png',
          active: false,
          id: 6
        }
      ]
    };
  }, */
  setup() {
    const store = useStore(),
      router = useRouter(),
      { t } = useI18n();
    /* data */
    // const manualAddress = ref(G.userManual);
    const showLogo = ref(G.showLogo);
    const showHome = ref(G.homeLocation === 'top');
    const title = ref(G.title);
    const isFull = ref(false);
    const isShowSystemHead = ref(false);
    const errorPage = ref(G.errorPage || '/error');

    /* computed */
    const getLinkResource = computed(() => {
      mapGetters(['getLinkResource']);
    });

    const getLoginInfo = computed(() => {
      mapGetters(['getLoginInfo']);
    });

    /* methods */
    //点击链接资源
    const clickLinkResource = (resource) => {
      resourceUtil.activeMenu(
        { store, router },
        resource.path,
        errorPage.value,
        false
      );
    };

    /* const goHome = () => {
      router.push(G.homePage);
    }; */

    /* 退出 */
    const userLogout = () => {
      store
        .dispatch('logout')
        .then(() => {
          if (isFull.value) {
            launchFullScreen();
          }
          logout({ router });
        })
        .catch(() => {
          ElMessage.error(t('head.msg.logout_fail'));
        });
    };

    const goPortal = () => {
      if (G.jump) {
        G.portalPage = G.jump;
      } else if (cookie.getCookie('jump')) {
        G.jump = cookie.getCookie('jump');
        G.portalPage = G.jump;
      }
      window.location.href = G.portalPage;
    };

    const goPage = (page) => {
      if (page) {
        router.push(page);
      }
    };

    /* 全屏 */
    const launchFullScreen = () => {
      if (isFull.value) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitRequestFullscreen) {
          document.msExitRequestFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.msCancelFullscreen) {
          document.msCancelFullscreen();
        } else if (window.ActiveXObject) {
          let WsSell = new ActiveXObject('WScript.Shell');
          WsSell.SendKeys('{F11}');
        }
      } else {
        const de = document.documentElement;
        if (de.requestFullscreen) {
          de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
          de.mozRequestFullScreen();
        } else if (de.webkitRequestFullscreen) {
          de.webkitRequestFullscreen();
        } else if (de.msRequestFullscreen) {
          de.msRequestFullscreen();
        } else if (window.ActiveXObject) {
          let WsSell = new ActiveXObject('WScript.Shell');
          WsSell.SendKeys('{F11}');
        }
      }
      isFull.value = !isFull.value;
    };

    //判断显示系统头像，还是用户上传头像
    if (store.state.loginInfo.userHeadAddress) {
      isShowSystemHead.value = true;
    } else {
      isShowSystemHead.value = false;
    }

    return {
      showLogo,
      showHome,
      title,
      store,
      getLoginInfo,
      getLinkResource,
      clickLinkResource,
      goPage,
      goPortal,
      userLogout
      // goHome,
      // launchFullScreen
    };
  }
});
</script>
