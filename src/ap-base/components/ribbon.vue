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
import { mapGetters } from 'vuex';

export default {
  name: 's_ribbon',
  computed: mapGetters(['getCurrentResource']),
  created() {},
  methods: {
    goHome() {
      this.$router.push(G.homePage);
    },
    goPage(page) {
      this.$router.push(page);
    },
    refresh() {
      var a = this.$route.fullPath;
      this.$router.replace({
        path: '/404',
        query: { path: a }
      });
    }
  }
};
</script>
