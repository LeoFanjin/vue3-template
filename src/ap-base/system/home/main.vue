<!-- 首页 -->
<style lang="less" scoped src="./style.less"></style>

<template>
  <div id="ui_home" class="container-fluid">
    <!-- <p class="icon"><i class="icon iconfont icon-ap-smile"></i></p> -->
    <canvas id="clock" height="150" width="150"></canvas>
    <br />
    <p class="content">{{ t('common.label.welcome') }}{{ title }}</p>
  </div>
</template>

<script>
import { initClock } from '../../components/clock';
import { defineComponent, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  setup() {
    const { t } = useI18n();

    const title = ref(G.title);

    onMounted(() => {
      initClock();
    });
    return {
      title,
      t
    };
  }
});
</script>
