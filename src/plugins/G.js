import appConfig from '../config/index';

let indexConfig = {};
if (typeof extra !== 'undefined') {
  indexConfig = Object.assign({}, extra);
}

Object.assign(G, appConfig, {
  isRelyAPI: false, // 是否依赖后台接口
  homePage: '/home', // 首页路由
  homeLocation: 'top', // 首页位置 (left: 左侧、top: 顶部)
  is_i18n: false, // 是否支持多预言
  storage_key: 'user_info_d', // 用户信息 缓存 Key
  options_key: 'sinosoft_options', // 操作 缓存 Key
  lang_key: 'sinosoft_lang', // 语言 缓存 Key
  autonomously: false,
  sys_sign: 'system_sign',
  errorPage: '/error',
  lang: 'zh',
  token: null,
  jump: null
});
indexConfig.system_code && (G.system_code = indexConfig.system_code);
indexConfig.title && (G.title = indexConfig.title);
indexConfig.lang && (G.lang = indexConfig.lang);
indexConfig.base_api && (G.base_api = indexConfig.base_api);
indexConfig.portalPage && (G.portalPage = indexConfig.portalPage);
indexConfig.loginPage && (G.loginPage = indexConfig.loginPage);

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
