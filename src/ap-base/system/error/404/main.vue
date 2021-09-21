<style scoped>
#page_404 {
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
#page_404 .content {
  font-size: 50px;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -200px;
  width: 100%;
  color: #555;
  text-align: center;
}
</style>
<template>
  <div id="page_404">
    <div class="content">
      <p>404</p>
      <p>{{ t('common.label.not_found') }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  data() {
    return {
      path: ''
    };
  },
  setup() {
    const router = useRouter(),
      route = useRoute(),
      { t } = useI18n();

    /* methods */
    const refresh = (path) => {
      router.replace({
        path: path + ''
      });
    };

    const query = route.query;
    if (
      query.path != undefined &&
      query.path != null &&
      query.path != '' &&
      query.path != {}
    ) {
      refresh(query.path);
    }
    return {
      t
    };
  },
  created() {}
});
</script>
