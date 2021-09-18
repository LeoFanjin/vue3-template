<template>
  <div class="app-wrapper">
    <sHead></sHead>
    <sMenu></sMenu>
    <div
      class="app-content"
      :style="{ 'min-height': $store.state.min_height - 10 + 'px' }"
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
// import { mapGetters } from 'vuex';

export default {
  name: 'app',
  // computed: mapGetters(['getFullLoading']),
  components: {
    sHead,
    sMenu,
    sRibbon
  },
  created() {
    this.initStyle();
    // this.initDict();
  },
  methods: {
    initDict() {
      this.$store.dispatch('initDict');
    },
    initStyle() {
      var self = this;
      var minHeight = String(document.documentElement.clientHeight - 100);
      self.$store.dispatch('setMinHeight', minHeight);

      /* $(window).resize(function () {
        minHeight = String(document.documentElement.clientHeight - 100);
        self.$store.dispatch('setMinHeight', minHeight);
      }); */
    }
  }
};
</script>
