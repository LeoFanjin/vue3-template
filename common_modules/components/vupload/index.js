// 引用组件
import vupload from './main.vue';

vupload.install = function (Vue) {
  Vue.component(vupload.name, vupload);
};

export default vupload;
