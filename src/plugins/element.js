import {
  ElButton,
  ElInput,
  ElSelect,
  ElDialog,
  ElForm,
  ElFormItem,
  ElLoading
} from 'element-plus';
// 样式全局引入
// import 'element-plus/lib/theme-chalk/index.css';
// 这个未知......
import 'element-plus/lib/theme-chalk/base.css';
// 语言包
import locale from 'element-plus/lib/locale/lang/zh-cn';
// import { setLocale } from 'element-plus/lib/locale';

export default (app) => {
  // locale.use(locale);
  // setLocale(locale);
  app.use(ElButton, { locale });
  app.use(ElInput, { locale });
  app.use(ElSelect, { locale });
  app.use(ElDialog, { locale });
  app.use(ElForm, { locale });
  app.use(ElFormItem, { locale });
  app.use(ElLoading, { locale });
};
