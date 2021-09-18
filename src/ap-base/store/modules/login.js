import { Storage, cookie } from 'utils';
import _ from 'underscore';

var user,
  options,
  token = G.token || {};
/* if (!G.autonomously) {
  user = G.USER_INFO || {};
  options = G.OPTIONS || {};
  var token = G.token || {};
  if (!token) {
    token = null;
  }
  if (!user) {
    user = {};
  }
  if (!options) {
    options = [];
  }
} else {
  if (G.USER_INFO) {
    Storage.set(G.storage_key, G.USER_INFO);
  }
  user = Storage.get(G.storage_key);
  options = Storage.get(G.options_key);
} */
user = Storage.get(G.storage_key);
options = Storage.get(G.options_key);
//用户登录状态
export const loginState = {
  //当前登录用户信息
  loginInfo: user ? user : {},
  //当前操作
  options: options ? options : [],
  //当前token
  token: token ? token : []
};
export const loginMutation = {
  ['DELETE_USER'](state, messageId) {
    state.loginInfo = state.loginInfo.filter((m) => m.id != messageId);
  },
  /**
   * 设置用户信息
   * @param userInfo  用户信息
   */
  ['SET_USER_INFO'](state, userInfo) {
    state.loginInfo = userInfo;
    if (G.autonomously) {
      Storage.set(G.storage_key, userInfo);
    }
  },
  /**
   * 修改用户信息
   */
  ['UPDATE_MY_INFO'](state, userInfo) {
    state.loginInfo = _.extend(state.loginInfo, userInfo);
    if (G.autonomously) {
      Storage.set(G.storage_key, state.loginInfo);
    }
  },
  /**
   * 设置用户头像
   */
  ['SET_USER_HEAD'](state, userImgPath) {
    if (
      (userImgPath || userImgPath === '') &&
      typeof userImgPath === 'string'
    ) {
      state.loginInfo.userHeadAddress = userImgPath;
      if (G.autonomously) {
        Storage.set(G.storage_key, state.loginInfo);
      }
    }
  },
  /**
   * 登录
   * @param userInfo  用户信息
   */
  ['LOGIN'](state, userInfo) {
    state.loginInfo = userInfo;
    if (G.autonomously) {
      Storage.set(G.storage_key, userInfo);
    }
  },
  /**
   * 设置操作集
   * @param options  操作集
   */
  ['SET_OPTIONS'](state, options) {
    // Storage.set(G.options_key, options);
    state.options = options;
    if (G.autonomously) {
      Storage.set(G.options_key, options);
    }
  },
  /**
   * 设置TOKEN
   * @param token  token值
   */
  ['SET_TOKEN'](state, token) {
    // Storage.set(G.token_key, token);
    state.token = token;
    G.token = token;
    cookie.setCookie('token', G.token);
  },
  /**
   * 退出
   */
  ['LOGOUT_USER'](state) {
    if (!G.autonomously) {
      G.token = null;
      state.options = {};
      state.token = null;
    } else {
      Storage.remove(G.storage_key);
      Storage.remove(G.options_key);
    }
    state.loginInfo = {};
  }
};
