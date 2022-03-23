import './plugins/G';
import './plugins/resource';
import { createApp } from 'vue';
import App from './App.vue';
// import './registerServiceWorker';
import router from './router';
import store from './store';
import i18n from './i18n';
// import { Storage } from 'utils';
import Directives from 'directives';
// import jsonp from 'jsonp';

createApp(App).use(store).use(router).use(i18n).use(Directives).mount('#app');

// 单点登录
/* const GetQueryString = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return '';
};
let token = GetQueryString('t') || '';
if (!token) {
  let name = `token_${G.sys_sign}`;
  let r = new RegExp(`(?:^|;\\s*)${name}=([^;]*)`),
    m = document.cookie.match(r);
  token = (m && m[1]) || '';
}
if (token) {
  let jump = GetQueryString(`jump_${G.sys_sign}`);
  G.token = token;
  document.cookie = `token_${G.sys_sign}=${token}`;
  G.jump = jump;
  document.cookie = `jump_${G.sys_sign}=${jump}`;
  jsonp(
    `${G.base_api}/ap-system/UserLoginForChild?authorization=${token}`,
    {
      timeout: 60000
    },
    (err, results) => {
      if (err) {
        ElMessage.error(typeof err === 'string' ? err : '登录失败');
      } else {
        if (results.status === 1) {
          let data = results.data;
          if (data.organizationEntity && data.userEntity) {
            data.userEntity.organ = data.organizationEntity;
          }
          Storage.set(G.storage_key, data.userEntity);
          Storage.set(G.options_key, data.operationEntities);

          // 单点登录成功后初始化Vue
          const store = require('./store').default;
          const app = createApp(App);
          installElementPlus(app);
          app.use(store).use(router).use(i18n).use(Directives).mount('#app');
        } else {
          ElMessage.error(
            typeof results.message === 'string' ? err : '登录失败'
          );
        }
      }
    }
  );
} */
