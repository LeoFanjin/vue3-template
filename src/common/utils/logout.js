import { Storage as StorageUtil } from './storage';
import { cookie as cookieUtil } from './cookie';
import { getAgent as getAgentUtil } from './agent';
const getAgent = getAgentUtil;
const cookie = cookieUtil;
const Storage = StorageUtil;

const getURI = (loginPage, jump) => {
  let uri = loginPage;
  if (jump && loginPage.indexOf('?') !== -1) {
    uri += '&jump=' + encodeURIComponent(jump);
  } else if (jump) {
    uri += '?jump=' + encodeURIComponent(jump);
  }
  return uri;
};
const logout = (self, jump) => {
  let pre = '',
    ieV = getAgent();
  /* ie9及以下需要手动加# */
  if (ieV && ieV <= 9 && !self) {
    pre = '/#';
  }
  let loginPage = pre + '/login';

  if (G) {
    loginPage = pre + (G.loginPage ? G.loginPage : '/login');
    // Storage.remove(G.storage_key);
    //
    // if (G.loginPage) {
    //   loginPage = pre + G.loginPage; //如果配置文件有loginPage则跳到配置文件的loginPage
    // }
  }
  // if (self) {
  //   self.$router.push(loginPage);
  // } else {
  if (G.jump) {
    loginPage = G.jump;
  } else if (cookie.getCookie('jump')) {
    G.jump = cookie.getCookie('jump');
    loginPage = G.jump;
  }
  if (!G.autonomously) {
    cookie.removeCookie(`token_${G.sys_sign}`);
  } else {
    Storage.remove(G.storage_key);
  }
  window.location.href = getURI(loginPage, jump);
  // }
};

export { logout };
