import Promise from 'bluebird';
import _ from 'underscore';
import { logout } from './logout';
import { lang } from '../../src/ap-base/lang';
const i18n = lang[`${G.lang}`];
const Ajax = {};

/**
 * ajax请求成功处理
 * res : {
 *    data: '',
 *    status: '',
 *    message: ''
 * }
 */
Ajax.dealSuccess = res => {
  try {
    if (res.status === 1 || res.status === '1') {
      if (res.subdata && _.isObject(res.subdata)) {
        res.data = {
          rows: res.data,
          pageInfo: res.subdata
        };
      }
      if (res.token) {
        return Promise.resolve(res);
      } else {
        return Promise.resolve(res.data ? res.data : res);
      }
      // 仅用于注册后直接登录状态
    } else if (res.status === 101 || res.status === '101') {
      var data = res.data ? res.data : res;
      return Promise.resolve({ data: data, status: 101 }, res);
    } else {
      return Ajax.generateError(res.message);
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * ajax请求异常处理
 */
Ajax.dealCommonError = res => {
  console.log('res', res);
  try {
    if (res.status === 403 || res.status === 401) {
      logout();
    } else if (res.status === 500) {
      let code = JSON.parse(res.responseText).message;

      if (code) {
        let message = i18n.server.result[code];
        if (message) {
          Ajax.showMessage(message);
        } else {
          return Promise.reject(i18n.server.result[code] || code);
        }
        if (code === 'UN_LOGIN') setTimeout(() => logout(), 500);
      }
    } else if (res.statusText === 'timeout') {
      Ajax.showMessage(i18n.common.msg.timeout);
    } else if (res.statusText === 'error') {
      Ajax.showMessage(i18n.common.msg.server_error);
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * 显示消息
 * @param message 消息内容
 * @param timeout 销毁时间
 */
Ajax.showMessage = (message, timeout = 2000) => {
  if (message) {
    G.$notify.error(message);
  }
};

/**
 * 根据服务器编码,抛出错误信息异常
 * @param code 编码
 */
Ajax.generateError = code => {
  return Promise.reject(i18n.server.result[code] || code);
};

export { Ajax };
