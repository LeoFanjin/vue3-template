<template>
  <!-- 全局设置element语言 -->
  <el-config-provider :locale="locale">
    <div
      class="app-provider-wrapper"
      v-loading.fullscreen.lock="getFullLoading"
    >
      <router-view />
    </div>
  </el-config-provider>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { ElConfigProvider } from 'element-plus';
// 语言包，默认为en
import locale from 'element-plus/lib/locale/lang/zh-cn';
export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider
  },
  setup() {
    const store = useStore();
    const getFullLoading = computed(() => store.getters.getFullLoading);
    return {
      locale,
      getFullLoading
    };
  }
});
</script>

<style lang="less">
:root {
  ::-webkit-scrollbar-track-piece {
    background-color: #f8f8f8;
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #e2e2e2;
    background-clip: padding-box;
    min-height: 28px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #bbb;
  }
}
</style>
