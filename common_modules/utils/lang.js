import { Storage } from './storage';

export const langx = {
  // 设置语言
  setLanguage($i18n, lang) {
    $i18n.locale.value = lang;
    G.lang = lang;
    Storage.set(G.lang_key, lang);
  },
  // 读取语言
  getLanguage($i18n) {
    let lang = Storage.get(G.lang_key);
    if (!lang) {
      lang = $i18n.locale.value;
    }
    return lang;
  }
};
