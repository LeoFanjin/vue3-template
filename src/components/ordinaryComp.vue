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
    return () => (
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
    );
  }
});
</script>
