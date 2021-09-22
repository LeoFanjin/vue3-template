<script>
const functionalComponent = (props, { emit }) => {
  return (
    <div>
      <div>{props.content}</div>
      <div>
        <el-button
          type="primary"
          size="mini"
          onClick={() => emit('custom-click', 'you clicked here')}
        >
          Click Here
        </el-button>
      </div>
    </div>
  );
};
export default functionalComponent;
</script>
