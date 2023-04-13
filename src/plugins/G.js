import appConfig from '../config/index';

// 合并模式文件中的变量
const envConfig = Object.create(null);
if (process.env) {
  const envEntries = Object.entries(process.env);
  if (envEntries.length) {
    envEntries.forEach(([key, val]) => {
      if (key.startsWith('VUE_APP_')) {
        const localKey = key.substring(8).toLowerCase();
        envConfig[localKey] = val;
      }
    });
  }
}

// 合并extra中可能存在的更改的变量
const extraConfig = {};
if (typeof extra !== 'undefined') {
  Object.assign(extraConfig, extra);
}

Object.assign(G, envConfig, appConfig, extraConfig, {
  isRelyAPI: false, // 是否依赖后台接口
  homePage: '/home', // 首页路由
  homeLocation: 'top', // 首页位置 (left: 左侧、top: 顶部)
  is_i18n: false, // 是否支持多预言
  storage_key: 'user_info_d', // 用户信息 缓存 Key
  options_key: 'sinosoft_options', // 操作 缓存 Key
  lang_key: 'sinosoft_lang', // 语言 缓存 Key
  autonomously: false,
  sys_sign: 'system_sign_vue3',
  errorPage: '/error',
  lang: 'zh',
  token: null,
  jump: null
});

if (!G.isRelyAPI) {
  G.localResource = require('@/ap-base/local-resources');
}

// 对utils的引用不能早于G的初始化
const { myBrowser } = require('utils');
if (myBrowser() === 'Safari' && G.supportSafari) {
  let urlArray = G.base_api.split('/');
  let base_api = window.location.protocol + '//' + window.location.host;
  if (urlArray.length >= 4) {
    base_api += '/' + urlArray[3];
  }
  G.base_api = base_api;
}
