import { ElNotification } from 'element-plus';
import { logout } from './logout';
import { lang } from '../../src/ap-base/lang';
const i18n = lang[`${G.lang}`];

const handleError = (error) => {
  const config = error.config;
  if (config.commit) config.commit('SET_FULL_LOADING', false);
  if (
    error.code === 'ECONNABORTED' &&
    error.message.indexOf('timeout') !== -1
  ) {
    // 超时
    ElNotification.error(i18n.common.msg.timeout);
  }
  let res = error.response;
  if (res.status === 403 || res.status === 401) {
    logout();
  } else if (res.status === 500) {
    let code = res.data.message;
    if (code) {
      let message = i18n.server.result[code];
      if (message) {
        ElNotification.error(message);
      } else {
        return Promise.reject(i18n.server.result[code] || code);
      }
      if (code === 'UN_LOGIN') {
        setTimeout(() => logout(), 500);
      }
    }
  } else if (res.statusText === 'timeout') {
    ElNotification.error(i18n.common.msg.timeout);
  } else if (res.statusText === 'error') {
    ElNotification.error(i18n.common.msg.server_error);
  } else {
    ElNotification.error(res.data.message);
  }
};

// 请求拦截器
export const RequestInterceptor = {
  requestWithoutFormat: (config) => {
    // Do something before request is sent
    if (config.commit) config.commit('SET_FULL_LOADING', true);
    return config;
  },
  requestError: (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
};

/**
 * Response Schema
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the HTTP headers that the server responded with
  // All header names are lower cased and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance in the browser
  request: {}
}
*/
// 响应拦截器
export const ResponseInterceptor = {
  responseWithoutFormat: (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  responseWithFormat: (response) => {
    const config = response.config;
    if (config.commit) config.commit('SET_FULL_LOADING', false);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.status === 1) {
      if (response.data.subdata && _.isObject(response.data.subdata)) {
        response.data.data = {
          rows: response.data.data,
          pageInfo: response.data.subdata
        };
      }
      if (response.data.token) {
        return response.data;
      } else {
        return response.data.data ? response.data.data : response.data;
      }
    } else if (response.data.status === 101) {
      // 仅用于注册后直接登录状态
      let data = response.data.data ? response.data.data : response.data;
      return Promise.resolve({ data: data, status: 101 }, response.data);
    } else {
      return Promise.reject(
        i18n.server.result[response.data.message] || response.data.message
      );
    }
  },
  responseError: (error) => {
    console.log('service error', error.toJSON());
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    handleError(error);
    // return Promise.reject(error.response.data);
  }
};
