import axios from 'axios';
import qs from 'qs';
import { ElNotification } from 'element-plus';
import { logout } from './logout';
import { lang } from '../../src/ap-base/lang';
const i18n = lang[`${G.lang}`];

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

export const Axios = {
  basePost: (config) => {
    const service = axios.create({
      method: 'post',
      baseURL: G.base_api,
      timeout: 5000,
      withCredentials: true, // 跨域请求时是否需要使用凭证
      // `transformRequest` allows changes to the request data before it is sent to the server
      // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
      // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
      // FormData or Stream
      // You may modify the headers object.
      transformRequest: [
        (data, headers) => {
          return qs.stringify(data);
        }
      ],
      // `responseType` indicates the type of data that the server will respond with
      // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
      //   browser only: 'blob'
      responseType: 'json',
      // `responseEncoding` indicates encoding to use for decoding responses (Node.js only)
      // Note: Ignored for `responseType` of 'stream' or client-side requests
      responseEncoding: 'utf8'
    });
    service.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded;charset=utf-8';
    const isInApp = service.defaults.baseURL.indexOf(G.base_api) === 0; // 是否从平台发送请求
    if (!G.autonomously) {
      const token = null;
      if (token && isInApp) {
        service.defaults.headers['Authorization'] = `JWT ${token}`;
      }
    }
    // 请求拦截器
    service.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        if (config.commit) config.commit('SET_FULL_LOADING', true);
        return config;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    // 响应拦截器
    service.interceptors.response.use(
      (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
      },
      (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        handleError(error);
        // return Promise.reject(error);
      }
    );
    return service(config);
  },
  post: (config) => {
    const service = axios.create({
      method: 'post',
      baseURL: G.base_api,
      timeout: 10000,
      withCredentials: true, // 跨域请求时是否需要使用凭证
      // `transformRequest` allows changes to the request data before it is sent to the server
      // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
      // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
      // FormData or Stream
      // You may modify the headers object.
      transformRequest: [
        (data, headers) => {
          return qs.stringify(data);
        }
      ],
      // `transformResponse` allows changes to the response data to be made before
      // it is passed to then/catch
      // v0.21.4下要取消这个transformResponse，不然返回数据会变成json字符串，原因未知
      /* transformResponse: [
        (data) => {
          return data;
        }
      ], */
      // `paramsSerializer` is an optional function in charge of serializing `params`
      // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
      // paramsSerializer: (params) => {
      //   return qs.stringify(params, {arrayFormat: 'brackets'})
      // },
      // `responseType` indicates the type of data that the server will respond with
      // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
      //   browser only: 'blob'
      responseType: 'json',
      // `responseEncoding` indicates encoding to use for decoding responses (Node.js only)
      // Note: Ignored for `responseType` of 'stream' or client-side requests
      responseEncoding: 'utf8'
      // `validateStatus` defines whether to resolve or reject the promise for a given
      // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
      // or `undefined`), the promise will be resolved; otherwise, the promise will be
      // rejected.
      /* validateStatus: (status) => {
        return status >= 200 && status < 300; // default
      } */
    });
    service.defaults.headers['Content-Type'] =
      'application/x-www-form-urlencoded;charset=utf-8';
    const isInApp = service.defaults.baseURL.indexOf(G.base_api) === 0; // 是否从平台发送请求
    if (!G.autonomously) {
      const token = G.token || null;
      if (token && isInApp) {
        service.defaults.headers.common['Authorization'] = token;
      }
    }
    // 请求拦截器
    service.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        if (config.commit) config.commit('SET_FULL_LOADING', true);
        return config;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    // 响应拦截器
    service.interceptors.response.use(
      /* 
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
      (response) => {
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
      (error) => {
        console.log('service error', error.toJSON());
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        handleError(error);
        // return Promise.reject(error.response.data);
      }
    );
    // data：参数
    // params：url中带的参数，Must be a plain object or a URLSearchParams object
    return service(config);
  }
};

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
