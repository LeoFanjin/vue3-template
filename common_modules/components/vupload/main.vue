<style lang="less" src="./style.less"></style>

<template>
  <div id="upload">
    <el-upload
      class="upload-demo"
      :action="upload.action"
      :multiple="upload.multiple"
      :showFileList="upload.showFileList"
      :drag="upload.drag"
      :accept="upload.accept"
      :listType="upload.listType"
      :limit="upload.limit"
      :data="fileParam"
      :headers="headers"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="mini" type="primary">点击上传</el-button>
      <template #tip>
        <div class="el-upload__tip">{{ upload.tip }}</div>
      </template>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img class="img-preview" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'vupload',
  props: {
    upload: {
      default: {
        action: G.base_api + '/body/uploadFilesOnLocal',
        multiple: false,
        showFileList: true,
        drag: false,
        accept: 'image/*,application/*', //https://blog.csdn.net/u013379933/article/details/77119796
        listType: 'text', //  text/picture/picture-card
        limit: 100,
        tip: '只能上传jpg/png文件，且不超过500kb'
      },
      type: Object
    },
    fileParam: {
      default: { name: '' },
      type: Object
    },
    fileList: []
  },
  data() {
    return {
      headers: {
        authorization: G.token
      },
      dialogVisible: false,
      dialogImageUrl: ''
    };
  },
  mounted() {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      file.url =
        file.response.data && file.response.data[0]
          ? file.response.data[0]
          : '/dist/vendor/image/logo.png';
      if (file.raw.type.includes('image')) {
        this.dialogVisible = true;
        this.dialogImageUrl = file.url;
      }
    },
    handleExceed(files, fileList) {
      let self = this;
      this.$message.warning(
        `当前限制选择 ${self.upload.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file) {
      this.$set(this.fileParam, 'name', file.name);
    }
  }
};
</script>
