/**
 * 权限验证指令
 * demo:  v-permissions="{options: $store.state.options, opt: 'PERMISSION_03'}"
 */
const permissions = {
  inserted: function (el, binding) {
    const obj = binding.value;

    const verify = function () {
      if (!_.findWhere(obj.options, { operationCode: obj.opt })) {
        el.parentNode.removeChild(el);
      }
    };
    if (obj.options && obj.options.length > 0) {
      verify();
    } else {
      el.parentNode.removeChild(el);
    }
  }
};

export { permissions };
