<script>
import { defineComponent, ref, reactive } from 'vue';
import { useStore } from 'vuex';
// import { ElMessage } from 'element-plus';
import { /* Axios, */ useLoading /* ResponseInterceptor */ } from 'utils';
import FunctionalComponent from '../../components/functionalComp.vue';
import OrdinaryComponent from '../../components/ordinaryComp.vue';
export default defineComponent({
  setup() {
    const store = useStore();
    const state = reactive({
      dateRange: '',
      queryParam: {
        province: '',
        city: '',
        county: '',
        startSearchTimeStr: '',
        endSearchTimeStr: '',
        keyWord: '',
        order: 0,
        pageIndex: 1,
        pageSize: 10
      }
    });
    const permited = ref(true);
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
    //
    /* const getUserList = () => {
      Axios.post(
        {
          url: '/userMangerController/getUserList',
          data: state.queryParam
        },
        {
          requestInterceptor: {
            handler: (config) => {
              console.log('req', config);
              return config;
            }
          },
          responseInterceptor: {
            handler: ResponseInterceptor.responseWithoutFormat
          }
        }
      )
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          ElMessage.error(
            typeof error === 'string' ? error : '查询失败,请稍后再试'
          );
        });
    }; */

    // /configInfoController/saveConfigInfo
    /* const saveConfigInfo = () => {
      Axios.put({
        url: '/configInfoController/saveConfigInfo',
        data: {
          startDateStr: '2021-10-08 00:00:00',
          endDateStr: '2021-10-10 23:59:59',
          tipInfo: '试一下put3',
          comments: '电饭锅'
        }
      })
        .then((data) => {
          console.log('save', data);
        })
        .catch((error) => {
          ElMessage.error(
            typeof error === 'string' ? error : 'PUT失败,请稍后再试'
          );
        });
    }; */
    /* const modifyConfigInfo = () => {
      Axios.put({
        url: '/configInfoController/modifyConfigInfo',
        data: {
          id: 'a89175177b82176a30abef526e375ea5',
          startDateStr: '2021-10-01 00:00:00',
          endDateStr: '2021-10-07 23:59:59',
          tipInfo: '试一下put2',
          comments: '分公司电饭锅2'
        }
      })
        .then((data) => {
          console.log('modify', data);
        })
        .catch((error) => {
          ElMessage.error(
            typeof error === 'string' ? error : 'PUT失败,请稍后再试'
          );
        });
    }; */
    //
    /* const removeConfigInfo = () => {
      Axios.post({
        url: '/configInfoController/removeConfigInfo',
        data: {
          id: 'e88f415b012ee913fa3b76da6d6f9767'
        }
      })
        .then((data) => {
          console.log('delete', data);
        })
        .catch((error) => {
          ElMessage.error(
            typeof error === 'string' ? error : 'DELETE失败,请稍后再试'
          );
        });
    }; */
    const toggleOpt = () => {
      permited.value = !permited.value;
    };

    // getUserList();
    // saveConfigInfo();
    // modifyConfigInfo();
    // removeConfigInfo();
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
        <div>
          <div v-permissions={[permited.value, 'visibility']}>
            You can see me!
          </div>
          <el-button size="small" onClick={toggleOpt}>
            Toggle visible
          </el-button>
        </div>
      </div>
    );
  }
});
</script>
