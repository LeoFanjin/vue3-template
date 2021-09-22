<script>
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { useLoading } from '../../utils/loading';
import FunctionalComponent from '../../components/functionalComp.vue';
import OrdinaryComponent from '../../components/ordinaryComp.vue';
export default defineComponent({
  setup() {
    const store = useStore();
    const state = reactive({
      dateRange: ''
    });
    const setFullLoading = () => {
      store.state.fullLoading = true;
      setTimeout(() => {
        store.state.fullLoading = false;
      }, 5000);
    };
    const loadingWithService = () => {
      const loading = useLoading();
      setTimeout(() => {
        loading.close();
      }, 3000);
    };
    return () => (
      <div class="about">
        <h1>This is an jsx about page</h1>
        <FunctionalComponent
          content="I am functional component"
          onCustomClick={(msg) => console.log(msg)}
        ></FunctionalComponent>
        {/* 
          事件监听，'onCustomClick'和'onCustom-click都可，'on-custom-click'不行
        */}
        <OrdinaryComponent
          content="I am ordinary component"
          onCustom-click={(msg) => console.log(msg)}
        ></OrdinaryComponent>
        <el-date-picker
          v-model={state.dateRange}
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
        <div id="loading-div">
          <el-button size="small" onClick={setFullLoading}>
            Loading full
          </el-button>
          <el-button size="small" onClick={loadingWithService}>
            Loading service
          </el-button>
        </div>
      </div>
    );
  }
});
</script>
