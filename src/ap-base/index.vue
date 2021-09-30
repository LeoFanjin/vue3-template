<template>
  <div class="app-wrapper">
    <sHead></sHead>
    <sMenu></sMenu>
    <div
      class="app-content"
      :style="{ 'min-height': $store.state.min_height - 16 + 'px' }"
      v-if="$store.state.showContent"
    >
      <router-view></router-view>
    </div>
    <sRibbon></sRibbon>
  </div>
</template>

<script>
import sHead from './components/head';
import sMenu from './components/menu';
import sRibbon from './components/ribbon';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'app',
  components: {
    sHead,
    sMenu,
    sRibbon
  },
  setup() {
    const store = useStore();

    /* methods */
    const initDict = () => {
      store.dispatch('initDict');
    };
    const initStyle = () => {
      let minHeight = String(document.documentElement.clientHeight - 100);
      store.dispatch('setMinHeight', minHeight);

      window.onresize = function () {
        minHeight = String(document.documentElement.clientHeight - 100);
        store.dispatch('setMinHeight', minHeight);
      };
    };

    /* mounted */
    onMounted(() => {
      initStyle();
    });

    // initDict();
  }
};
</script>
