<style scoped lang="less" src="./style.less"></style>

<template>
  <div>
    <div class="edit_head">
      <!-- 选择默认图片 -->
      <div class="m_left" v-if="!status.isTailoring">
        <div class="m_container">
          <p class="m_title">方法一: 选择本地照片,上传编辑自己的头像</p>
          <div class="m_opt">
            <button class="btn btn-default btn-sm" @click="openFile">
              选择图片
            </button>
            <span class="describe">支持jpg、jpeg、png、bmp格式的图片</span>
          </div>
        </div>
        <div class="m_container">
          <p class="m_title">方法二: 选择推荐头像,快速上传优质头像</p>
          <ul class="m_default_img">
            <li
              v-for="item in defaultImg"
              @click="changeCurrentImg(item.id)"
              :class="{ active: item.active }"
            >
              <img :src="item.src" />
            </li>
          </ul>
          <div class="m_opt">
            <button
              class="btn btn-default btn-sm"
              :disabled="!status.isCanSave"
              @click="saveSystemHead"
            >
              保存头像
            </button>
          </div>
        </div>
      </div>
      <!-- 选择剪切图片 -->
      <div class="m_left" v-if="status.isTailoring">
        <div
          class="pre-big-content"
          style="
            width: 280px;
            height: 280px;
            border: 1px solid @app-assist-color-lightblue;
          "
        >
          <div
            class="pre-big"
            :style="{ width: big.width + 'px', height: big.height + 'px' }"
          >
            <div v-if="move.show" class="bg-top" :style="topStyle"></div>
            <div v-if="move.show" class="bg-left" :style="leftStyle"></div>
            <div
              v-if="move.show"
              id="selector"
              style="left: 0; top: 0"
              :style="centerStyle"
              class="selector"
              @mouseup="mouseup"
              @mouseout="mouseup"
              @mousedown="mousedown"
              @mousemove="mouseMove"
            ></div>
            <div v-if="move.show" class="bg-right" :style="rightStyle"></div>
            <div v-if="move.show" class="bg-bottom" :style="bottomStyle"></div>
            <!--<img :src="head.src" :style="{'width': big.width + 'px', 'height': big.width + 'px'}">-->
            <div id="img-container">
              <img id="asdf" :src="head.src" />
            </div>
          </div>
        </div>

        <div class="opt">
          <button class="btn btn-default btn-sm" @click="startUpload">
            保存头像
          </button>
          <button class="btn btn-default btn-sm" @click="openFile">
            重新选择
          </button>
          <button class="btn btn-default btn-sm" @click="fallback">返回</button>
        </div>
      </div>

      <div class="preview">
        <p class="describe describe-title">效果预览</p>
        <p class="describe">
          你上传的图片会自动生成2种尺寸,请注意小尺寸的头像是否清晰
        </p>
        <div class="pre-default">
          <img
            v-show="isShowDefaultImg"
            src="/dist/vendor/image/head/head.jpg"
            alt=""
            style="width: 140px; height: 140px"
          />
          <img
            v-show="!isShowDefaultImg"
            id="default-img"
            :src="head.src"
            :style="normalImgStyle"
          />
        </div>
        <div class="describe">140 * 140像素</div>
        <div class="pre-small">
          <img id="small-img" :src="head.src" :style="smallImgStyle" />
        </div>
        <div class="describe">35 * 35像素</div>
      </div>
      <sinosoft_file_uploader
        ref="upload"
        :action="upload.action"
        buttonId="fileUploadButtonAdd"
        :multi_selection="false"
        :isAutoUpload="false"
        fileName="files"
        @addPreview="addPreview"
        @success="uploadSuccess"
        @progress="unloadProgress"
        @error="onError"
      ></sinosoft_file_uploader>
      <button id="fileUploadButtonAdd" style="display: none"></button>
    </div>
  </div>
</template>

<script>
import sinosoft_file_uploader from 'components/pl-upload';

export default {
  components: {
    sinosoft_file_uploader
  },
  computed: {
    // big -> top style
    topStyle: {
      get() {
        return {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: this.big.height - this.big.center.top + 'px'
        };
      }
    },
    // big -> left style
    leftStyle: {
      get() {
        return {
          position: 'absolute',
          top: this.big.center.top + 'px',
          left: 0,
          right: this.big.width - this.big.center.left + 'px',
          bottom:
            this.big.height -
            this.big.center.top -
            this.big.center.height +
            'px'
        };
      }
    },
    // big -> center style
    centerStyle: {
      get() {
        return {
          position: 'absolute',
          top: this.big.center.top + 'px',
          left: this.big.center.left + 'px',
          width: 140 + 'px',
          height: 140 + 'px'
        };
      }
    },
    // big -> right style
    rightStyle: {
      get() {
        return {
          position: 'absolute',
          top: this.big.center.top + 'px',
          left: this.big.center.left + this.big.center.width + 'px',
          right: 0,
          bottom:
            this.big.height -
            this.big.center.top -
            this.big.center.height +
            'px'
        };
      }
    },
    // big -> bottom style
    bottomStyle: {
      get() {
        return {
          position: 'absolute',
          top: this.big.center.top + this.big.center.height + 'px',
          left: 0,
          right: 0,
          bottom: 0
        };
      }
    },
    normalImgStyle: {
      get() {
        var width = this.big.width;
        var height = this.big.height;

        if (!this.move.show) {
          width = width / 2;
          height = height / 2;
        }
        return {
          top: -this.big.center.top + 'px',
          left: -this.big.center.left + 'px',
          width: width + 'px',
          height: height + 'px'
        };
      }
    },
    smallImgStyle: {
      get() {
        var width = this.big.width;
        var height = this.big.height;

        if (this.status.isTailoring) {
          if (!this.move.show) {
            width = width / 2;
            height = height / 2;
          }
          return {
            top: -((this.big.center.top / 8) * 2) + 'px',
            left: -((this.big.center.left / 8) * 2) + 'px',
            width: (this.big.width / 8) * 2 + 'px',
            height: (this.big.height / 8) * 2 + 'px'
          };
        } else {
          return {
            top: 0,
            left: 0,
            width: this.small.width + 'px',
            height: this.small.width + 'px'
          };
        }
      }
    }
  },
  data() {
    return {
      upload: {
        action: G.base_api + '/ap-system/uploadUserHead.do',
        params: {}
      },
      head: {
        src: ''
      },
      isShowDefaultImg: true,
      big: {
        width: 0,
        height: 0,
        center: {
          top: 0,
          left: 0,
          width: 140,
          height: 140
        }
      },
      normal: {
        width: 140
      },
      small: {
        width: 50,
        height: 50
      },
      move: {
        show: false,
        mouseX: 0,
        mouseY: 0,
        objX: null,
        objY: null,
        isDown: false
      },
      preview: {
        src: '/dist/vendor/image/head/head.jpg'
      },
      defaultImg: [
        {
          src: '/dist/vendor/image/head/default/bp_boy_1.png',
          active: false,
          id: 1
        },
        {
          src: '/dist/vendor/image/head/default/bp_boy_2.png',
          active: false,
          id: 2
        },
        {
          src: '/dist/vendor/image/head/default/bp_boy_3.png',
          active: false,
          id: 3
        },
        {
          src: '/dist/vendor/image/head/default/bp_girl_1.png',
          active: false,
          id: 4
        },
        {
          src: '/dist/vendor/image/head/default/bp_girl_2.png',
          active: false,
          id: 5
        },
        {
          src: '/dist/vendor/image/head/default/bp_girl_3.png',
          active: false,
          id: 6
        }
      ],
      imageId: null,
      status: {
        isCanSave: false,
        // 是否通过裁剪的方式上传
        isTailoring: false
      }
    };
  },
  created() {
    this.init();
    console.log(typeof null);
  },
  methods: {
    init() {
      this.move.show = false;
      this.head.src = '/dist/vendor/image/head/head.jpg';
    },
    /**
     * 调用上传组件方法
     */
    openFile() {
      this.head.src = '';
      document.querySelector('#fileUploadButtonAdd').click();
      this.isShowDefaultImg = false;
    },
    /**
     * 返回
     * @param file
     * @param imgSrc
     */
    fallback() {
      this.status.isTailoring = false;
      this.$refs.upload.cleanAll();
      this.big.center.left = 0;
      this.big.center.top = 0;
      this.status.isCanSave = false;
      this.init();
    },
    // 上传组件预览事件
    addPreview(file, imgSrc) {
      var self = this;
      self.isShowDefaultImg = false;
      if (imgSrc) {
        this.move.show = true;
        this.head.src = imgSrc;
        this.big.center.left = 0;
        this.big.center.top = 0;
        this.defaultImg = _.map(this.defaultImg, function (item) {
          item.active = false;
          return item;
        });
        this.status.isTailoring = true;
        setTimeout(function () {
          var imgContainer = document.getElementById('img-container');
          var localImg = document.getElementById('asdf');
          if (
            localImg.offsetWidth > localImg.offsetHeight ||
            localImg.offsetWidth === localImg.offsetHeight
          ) {
            imgContainer.style.height =
              280 * (localImg.offsetHeight / localImg.offsetWidth) + 'px';
            imgContainer.style.width = 280 + 'px';
            localImg.style.width = 100 + '%';
            self.big.width = 280;
            self.big.height =
              280 * (localImg.offsetHeight / localImg.offsetWidth);
          } else {
            imgContainer.style.height = 280 + 'px';
            imgContainer.style.width =
              280 * (localImg.offsetWidth / localImg.offsetHeight) + 'px';
            localImg.style.height = 280 + 'px';
            self.big.width =
              280 * (localImg.offsetWidth / localImg.offsetHeight);
            self.big.height = 280;
          }
        }, 500);
      }
    },
    startUpload() {
      this.$refs.upload.setOption({
        multipart_params: {
          userIds: this.$store.state.loginInfo.userId,
          toCropImgX: this.big.center.left + 1,
          toCropImgY: this.big.center.top + 1,
          toCropImgW: this.big.center.width,
          toCropImgH: this.big.center.height,
          zoomWidth: this.big.width,
          zoomHeight: this.big.height
        }
      });
      this.$refs.upload.start();
    },
    uploadSuccess(obj, data) {
      this.$emit('uploadedSuccess', JSON.parse(data));
      this.status.isTailoring = false;
      this.isShowDefaultImg = true;
      this.$refs.upload.cleanAll();
      this.big.center.left = 0;
      this.big.center.top = 0;
      this.status.isCanSave = false;
      this.init();
    },
    unloadProgress() {
      console.log('进度');
    },
    onError() {
      this.$notify.error('上传失败');
      this.big.center.left = 0;
      this.big.center.top = 0;
    },
    mousedown(e) {
      var div = document.getElementById('selector');
      this.move.objX = div.style.left;
      this.move.objY = div.style.top;
      this.move.mouseX = e.clientX;
      this.move.mouseY = e.clientY;
      this.move.isDown = true;
    },
    mouseup(e) {
      if (this.move.isDown) {
        this.moveSelector(e);
        this.move.mouseX = e.clientX;
        this.move.mouseY = e.clientY;
        this.move.isDown = false;
      }
    },
    mouseMove(e) {
      if (this.move.isDown) {
        this.moveSelector(e);
      }
    },
    moveSelector(e) {
      var div = document.getElementById('selector');
      var x = e.clientX;
      var y = e.clientY;
      var left =
        parseInt(this.move.objX) + parseInt(x) - parseInt(this.move.mouseX);
      var top =
        parseInt(this.move.objY) + parseInt(y) - parseInt(this.move.mouseY);

      if (left < 0) {
        left = 0;
      }
      if (top < 0) {
        top = 0;
      }

      var divWidth = div.style.width.substring(0, div.style.width.length);
      var divHeight = div.style.height.substring(0, div.style.height.length);

      if (parseInt(left) + parseInt(divWidth) > this.big.width) {
        left = this.big.width - divWidth - 2;
      }
      if (parseInt(top) + parseInt(divHeight) > this.big.height) {
        top = this.big.height - divHeight - 2;
      }

      this.big.center.left = left;
      this.big.center.top = top;
    },
    /**
     * 保存系统默认头像
     */
    saveSystemHead() {
      var self = this;
      if (self.imageId) {
        self.$store
          .dispatch('saveSystemHead', { imageId: self.imageId })
          .then(function () {
            self.$notify.success('头像修改成功');
          });
      }
    },
    //修改当前图片
    changeCurrentImg(id) {
      var self = this;

      if (id) {
        this.defaultImg = _.map(this.defaultImg, function (item) {
          item.active = false;
          if (item.id === id) {
            item.active = true;
            self.status.isCanSave = true;
            self.head.src = item.src;
            self.imageId = item.id;
          }
          return item;
        });
      }
    }
  }
};
</script>
