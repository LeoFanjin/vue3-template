import { defineComponent } from 'vue';
import './hello.less';
export default defineComponent({
  setup() {
    return () => <div class="jsx">jsx</div>;
  }
});
