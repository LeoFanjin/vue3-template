<style scoped lang="less" src="./style.less"></style>

<template>
  <div id="personal_head">
    <div class="panel">
      <div class="panel-heading">
        <!--<h2 class="panel-title">{{$t('userHead.label.head')}}</h2>-->
      </div>
      <div
        class="panel-body"
        :style="{
          height:
            this.$store.state.min_height -
            $store.state.base_height_difference +
            'px'
        }"
      >
        <div class="current_head">
          <ss_picture
            :src="head.src"
            @edit="editHead"
            @remove="removeHead"
          ></ss_picture>
        </div>
        <!--<shear @uploadedSuccess="uploadedSuccess"></shear>-->
      </div>
    </div>
    <imageUpload
      text=""
      :cropBtn="head.cropBtn"
      :crop="true"
      :url="head.action"
      :extensions="head.extensions"
      @errorhandle="uploadedError"
      @imageuploaded="uploadedSuccess"
    ></imageUpload>
  </div>
</template>

<script>
import { Ajax } from 'utils';
import ss_picture from 'components/picture';
import imageUpload from 'components/imageUpload';
//  import shear from './shear/main.vue';

export default {
  components: {
    ss_picture,
    imageUpload
    //      shear
  },
  data() {
    return {
      head: {
        cropBtn: null,
        src: '/dist/vendor/image/head/head.jpg',
        action: G.base_api + '/ap-system/uploadUserHead.do',
        extensions: 'png,bmp,jpeg,jpg'
      },
      preview: {
        src: '/dist/vendor/image/head/head.jpg'
      },
      defaultImg: [
        {
          src: '/dist/vendor/image/head/default/head.jpg',
          active: false,
          id: 1
        },
        { src: '/dist/vendor/image/head/default/01.png', active: false, id: 2 },
        {
          src: '/dist/vendor/image/head/default/head.jpg',
          active: false,
          id: 3
        },
        {
          src: '/dist/vendor/image/head/default/head.jpg',
          active: false,
          id: 4
        },
        {
          src: '/dist/vendor/image/head/default/head.jpg',
          active: false,
          id: 5
        }
      ],
      status: {
        isCanSave: false
      },
      move: {
        mouseX: 0,
        mouseY: 0,
        objX: null,
        objY: null,
        isDown: false
      },
      bigImg: {
        width: 320
      }
    };
  },
  created() {
    this.head.cropBtn = {
      ok: this.$t('common.label.save'),
      cancel: this.$t('common.label.cancel')
    };
    this.initHead();
    this.init();
  },
  methods: {
    init() {
      var self = this;

      self.$store
        .dispatch('findUserHead')
        .then(function (data) {
          if (data.userHeadAddress) {
            self.initHead(G.base_api + data.userHeadAddress);
          }
        })
        .catch(function (error) {
          if (error && typeof error === 'string') {
            self.$notify.error(error);
          }
        });
    },
    initHead(headSrc) {
      if (!headSrc || typeof headSrc !== 'string') {
        this.head.src = this.$store.state.default_head_img;
      } else {
        this.head.src = headSrc;
      }
    },
    /**
     * 修改头像
     */
    editHead() {
      let _input = document.querySelector(
        '#personal_head .g-core-image-upload-btn input'
      );

      if (_input && _input.length > 0) {
        _input.click();
      }
    },
    /**
     * 删除头像
     */
    removeHead() {
      var self = this;

      if (self.head.src === self.$store.state.default_head_img) {
        self.$notify.warning(self.$t('userHead.msg.no_remove'));
      } else {
        self
          .$confirm(
            self.$t('common.label.sure_remove'),
            self.$t('common.label.prompt'),
            {
              confirmButtonText: self.$t('common.label.determine'),
              cancelButtonText: self.$t('common.label.cancel'),
              type: 'warning'
            }
          )
          .then(function () {
            self.$store
              .dispatch('removeUserHead', {})
              .then(function () {
                self.$notify.success(
                  self.$t('userHead.msg.head_update_success')
                );
                self.initHead();
                self.$store.dispatch('setUserHead', '');
              })
              .catch(function (message) {
                self.$notify.error(
                  message && typeof message === 'string'
                    ? message
                    : self.$t('common.msg.delete_fail')
                );
              });
          })
          .catch(function () {});
      }
    },
    //头像上传成功
    uploadedSuccess(res) {
      var self = this;

      if (!_.isEmpty(res)) {
        Ajax.dealSuccess(res)
          .then(function (data) {
            self.head.src = G.base_api + data;
            self.$notify.success(self.$t('userInfo.msg.head_update_success'));
            self.$store.dispatch('setUserHead', data);
          })
          .catch(function (error) {
            self.$notify.error(
              error && typeof error === 'string' ? error : '上传失败'
            );
          });
      } else {
        self.$message('上传失败');
      }
    },
    //上传头像失败
    uploadedError(res) {
      this.$message('上传失败');
    }
  }
};
</script>
