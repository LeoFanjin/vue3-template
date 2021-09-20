<style lang="less" scoped src="./style.less"></style>
<script>
export default {
  render() {
    return (
      <div>
        <el-input v-model={this.inputText}></el-input>
        <div>{this.inputText}</div>
        <div>{this.getTextFilter}</div>
        <el-button
          type="primary"
          size="medium"
          onClick={() => (this.status.showSortForm = true)}
        >
          弹出层
        </el-button>
        <el-dialog
          width="600px"
          custom-class="list-dialog"
          v-model={this.status.showSortForm}
        >
          <div slot="title">
            <span class="el-dialog__title">任务分拣</span>
          </div>
          <div slot="footer" class="form-footer">
            <el-button
              size="small"
              onClick={() => (this.status.showSortForm = false)}
            >
              关闭
            </el-button>
          </div>
        </el-dialog>
      </div>
    );
  },
  data() {
    return {
      inputText: '',
      status: {
        showSortForm: false
      }
    };
  },
  filters: {},
  computed: {
    getTextFilter() {
      return `prefix-${this.inputText}-post`;
    }
  },
  methods: {}
};
</script>
