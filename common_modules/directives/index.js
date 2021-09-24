import { permissions } from './permissions';
// import { clickoutside } from './clickoutside';
/**
 * 指令插件
 */
const Directives = {};
Directives.install = function (Vue) {
  // 权限验证指令
  Vue.directive('permissions', permissions);
  // Vue.directive('clickoutside', clickoutside);
};

export default Directives;
