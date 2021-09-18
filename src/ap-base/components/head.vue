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
      <img class="brand-logo" v-if="showLogo" :src="$store.state.logo_src" />
      <strong class="brand-name" v-if="!showLogo">{{ title }}</strong>
    </div>
    <ul class="app-head__actions">
      <li class="message profile-name" style="cursor: auto; max-width: 250px">
        <img
          :src="getLoginInfo.userHeadAddress"
          class="img-circle"
          style="display: inline-block"
        />
        <span :title="$store.state.loginInfo.userName"
          >&nbsp;{{ $store.state.loginInfo.userName }}</span
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
      <li class="link" @click="logout">
        <a><i class="icon iconfont icon-ap-logout"></i></a>
        <div class="head_divide_line"></div>
      </li>
    </ul>
  </div>
  <!-- END HEADER -->
</template>

<script>
import _s from 'underscore.string';
import { logout, cookie, resource as resourceUtil } from 'utils';
import { mapGetters } from 'vuex';

export default {
  name: 's_head',
  computed: mapGetters(['getLinkResource', 'getLoginInfo']),
  data() {
    return {
      showLogo: G.showLogo,
      showHome: G.homeLocation === 'top',
      is_full: false,
      title: G.title,
      errorPage: G.errorPage || '/error',
      isShowSystemHead: false,
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
      ],
      manualAddress: G.userManual,
      isShowManual: false
    };
  },
  created() {
    //判断显示系统头像，还是用户上传头像
    if (this.$store.state.loginInfo.userHeadAddress) {
      this.isShowSystemHead = true;
    } else {
      this.isShowSystemHead = false;
    }
  },
  methods: {
    //点击链接资源
    clickLinkResource(resource) {
      resourceUtil.activeMenu(this, resource.path, this.errorPage, false);
    },
    goHome() {
      this.$router.push(G.homePage);
    },
    goPortal() {
      if (G.jump) {
        G.portalPage = G.jump;
      } else if (cookie.getCookie('jump')) {
        G.jump = cookie.getCookie('jump');
        G.portalPage = G.jump;
      }
      window.location.href = G.portalPage;
    },
    goPage(page) {
      if (page) {
        this.$router.push(page);
      }
    },
    launchFullScreen() {
      if (this.is_full) {
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
        var de = document.documentElement;
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
      this.is_full = !this.is_full;
    },
    logout() {
      var self = this;

      self.$store
        .dispatch('logout')
        .then(function () {
          if (self.is_full) {
            self.launchFullScreen();
          }
          logout(self);
        })
        .catch(function () {
          self.$message.error(self.$t('head.msg.logout_fail'));
        });
    },
    showManual() {
      var self = this;
      self.isShowManual = !self.isShowManual;
    }
  }
};
</script>
