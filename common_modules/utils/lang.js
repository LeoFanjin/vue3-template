import { Storage } from './storage';

export var langx = {
  // 设置语言
  setLanguage($vm, lang) {
    $vm.$i18n.locale = lang;
    G.lang = lang;
    Storage.set(G.lang_key, lang);
  },
  // 读取语言
  getLanguage($vm) {
    let lang = Storage.get(G.lang_key);
    if (!lang) {
      lang = $vm.$i18n.locale;
    }
    return lang;
  }
};
