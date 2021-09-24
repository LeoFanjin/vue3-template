import { permissions } from './permissions';
// import { button } from './rippleria';
// import { tip } from './tip';
// import { clickoutside } from './clickoutside';
// import { login } from './login';
/**
 * 指令插件
 */
const Directives = {};
Directives.install = function (Vue) {
  // 权限验证指令
  Vue.directive('permissions', permissions);
  // 按钮点击动画
  // Vue.directive('ap-btn', button);
  // tip提示
  // Vue.directive('ap-tip', tip);
  // placeholder兼容
  // Vue.directive('placeholder', login);
  // 权限验证指令
  // Vue.directive('clickoutside', clickoutside);
};

export default Directives;
