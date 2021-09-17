import { ElButton, ElInput, ElSelect } from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/lib/theme-chalk/base.css';
import lang from 'element-plus/lib/locale/lang/zh-cn';
import { setLocale } from 'element-plus/lib/locale';

export default (app) => {
  // locale.use(lang);
  setLocale(lang);
  app.use(ElButton);
  app.use(ElInput);
  app.use(ElSelect);
};
