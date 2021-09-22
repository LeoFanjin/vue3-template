<script>
import { defineComponent } from 'vue';
import FunctionalComponent from '../../components/functionalComp.vue';
import OrdinaryComponent from '../../components/ordinaryComp.vue';
export default defineComponent({
  setup() {
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
      </div>
    );
  }
});
</script>
