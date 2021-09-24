<template>
  <div>
    <div>{{ content }}</div>
    <div>
      <el-button
        type="primary"
        @click="() => emit('custom-click', 'you clicked me!')"
      >
        Click Me
      </el-button>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    return { emit };
    /* return () => (
      <div>
        <div>{props.content}</div>
        <div>
          <el-button
            type="primary"
            onClick={() => emit('custom-click', 'you clicked me!')}
          >
            Click Me
          </el-button>
        </div>
      </div>
    ); */
  }
});
</script>
