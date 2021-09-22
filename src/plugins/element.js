import {
  ElButton,
  ElConfigProvider,
  ElInput,
  ElSelect,
  ElDatePicker,
  ElDialog,
  ElForm,
  ElFormItem,
  ElLoading
} from 'element-plus';
// 样式全局引入
// import 'element-plus/lib/theme-chalk/index.css';
// 这个未知......
import 'element-plus/lib/theme-chalk/base.css';
// 语言包，默认为en
// import locale from 'element-plus/lib/locale/lang/zh-cn';
// import { setLocale } from 'element-plus/lib/locale';

export default (app) => {
  // locale.use(locale);
  // setLocale(locale);
  app.use(ElButton);
  app.use(ElConfigProvider);
  app.use(ElInput);
  app.use(ElSelect);
  app.use(ElDatePicker);
  app.use(ElDialog);
  app.use(ElForm);
  app.use(ElFormItem);
  app.use(ElLoading);
};
