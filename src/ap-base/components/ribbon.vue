<template>
  <!-- ribbon -->
  <div class="app-ribbon">
    <!--<span class="app-ribbon-curr-name">{{getCurrentResource.name}}</span>-->
    <ol class="app-ribbon-bread">
      <li class="pointer" @click="refresh()">
        <i class="icon iconfont icon-ap-refresh"></i>
      </li>
      <li v-if="getCurrentResource.pid">{{ getCurrentResource.pname }}</li>
      <li
        v-if="getCurrentResource.id"
        class="pointer current-path"
        @click="goPage(getCurrentResource.path)"
      >
        {{ getCurrentResource.name }}
      </li>
    </ol>
  </div>
  <!-- END ribbon -->
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 's_ribbon',
  setup() {
    const store = useStore(),
      router = useRouter(),
      route = useRoute();

    /* computed */
    const getCurrentResource = computed(() => store.state.currentResource);
    // const getCurrentResource = computed(() => store.getters.getCurrentResource);

    /* methods */
    /* const goHome = () => {
      router.push(G.homePage);
    }; */
    const goPage = (page) => {
      router.push(page);
    };
    const refresh = () => {
      const a = route.fullPath;
      router.replace({
        path: '/404',
        query: { path: a }
      });
    };

    return {
      getCurrentResource,
      goPage,
      refresh
    };
  }
});
</script>
