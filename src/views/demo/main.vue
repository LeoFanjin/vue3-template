<style lang="less" scoped src="./style.less"></style>
<script>
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
  render() {
    return (
      <div>
        <el-input v-model={this.inputText}></el-input>
        <div>{this.inputText}</div>
        <div>{this.getTextFilter}</div>
        <el-button
          type="primary"
          size="medium"
          onClick={() => (this.showSortForm = true)}
        >
          弹出层
        </el-button>
        <el-dialog
          width="600px"
          custom-class="list-dialog"
          v-model={this.showSortForm}
          v-slots={{
            title: () => <span class="el-dialog__title">任务分拣</span>,
            footer: () => (
              <div class="form-footer">
                <el-button
                  size="small"
                  onClick={() => (this.showSortForm = false)}
                >
                  关闭
                </el-button>
              </div>
            )
          }}
        ></el-dialog>
      </div>
    );
  },
  setup() {
    const inputText = ref('');
    const showSortForm = ref(false);

    const getTextFilter = computed(() => `prefix-${inputText.value}-post`);

    return {
      inputText,
      showSortForm,
      getTextFilter
    };
  }
});
</script>
