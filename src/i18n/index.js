import { createI18n } from 'vue-i18n';
import { lang } from '../ap-base/lang/index';

const i18n = createI18n({
  locale: 'zh',
  messages: lang
});

export default i18n;
