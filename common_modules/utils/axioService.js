import axios from 'axios';
import qs from 'qs';
import { RequestInterceptor, ResponseInterceptor } from './interceptor';
import { toRawType } from './helper';

// 创建axios实例的默认配置
const defaultConfig = {
  baseURL: G.base_api,
  timeout: 10000,
  withCredentials: true, // 跨域请求时是否需要使用凭证
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

  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  // paramsSerializer: (params) => {
  //   return qs.stringify(params, {arrayFormat: 'brackets'})
  // },

  // `onUploadProgress` 允许为上传处理进度事件
  /* onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  }, */

  // `onDownloadProgress` 允许为下载处理进度事件
  /* onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  }, */

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  /* proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  }, */

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  /* cancelToken: new CancelToken(function (cancel) {
  }), */
};

// 请求拦截器设置
const requestInterceptorHelper = (axiosInstance, requestInterceptor = null) => {
  /**
   * 如果optional通过requestInterceptor传入，则用传入的
   * requestInterceptor: {
   *   handler: Function,
   *   error: Function
   * }
   */
  if (requestInterceptor && toRawType(requestInterceptor) === 'Object') {
    const handlerFn = requestInterceptor.handler,
      errorFn = requestInterceptor.error;
    axiosInstance.interceptors.request.use(
      handlerFn && typeof handlerFn === 'function'
        ? handlerFn
        : RequestInterceptor.requestWithoutFormat,
      errorFn && typeof errorFn === 'function'
        ? errorFn
        : RequestInterceptor.requestError
    );
  } else {
    axiosInstance.interceptors.request.use(
      RequestInterceptor.requestWithoutFormat,
      RequestInterceptor.requestError
    );
  }
};

// 响应拦截器设置
const responseInterceptorHelper = (axiosInstance, responseInterceptor) => {
  /**
   * 如果optional通过responseInterceptor传入，则用传入的
   * responseInterceptor: {
   *   handler: Function,
   *   error: Function
   * }
   */
  if (responseInterceptor && toRawType(responseInterceptor) === 'Object') {
    const handlerFn = responseInterceptor.handler,
      errorFn = responseInterceptor.error;
    axiosInstance.interceptors.response.use(
      handlerFn && typeof handlerFn === 'function'
        ? handlerFn
        : ResponseInterceptor.responseWithFormat,
      handlerFn && typeof handlerFn === 'function'
        ? errorFn
        : ResponseInterceptor.responseError
    );
  } else {
    axiosInstance.interceptors.response.use(
      ResponseInterceptor.responseWithFormat,
      ResponseInterceptor.responseError
    );
  }
};

export const Axios = {
  // get请求, 对返回数据不做额外变换
  baseGet: (config) => {
    const axiosInstance = axios.create(
      Object.assign({}, defaultConfig, {
        method: 'get'

        // `params` 是即将与请求一起发送的 URL 参数
        // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
        /* params: {
            ID: 12345
          }, */
      })
    );
    // axiosInstance.defaults.headers.post['Content-Type'] =
    //   'application/x-www-form-urlencoded;charset=utf-8';
    const isInApp = axiosInstance.defaults.baseURL.indexOf(G.base_api) === 0; // 是否从平台发送请求
    if (!G.autonomously) {
      const token = null;
      if (token && isInApp) {
        axiosInstance.defaults.headers['Authorization'] = `JWT ${token}`;
      }
    }
    // 设置拦截器
    requestInterceptorHelper(axiosInstance);
    responseInterceptorHelper(axiosInstance);
    return axiosInstance(config);
  },

  get: (config, optional = {}) => {
    const axiosInstance = axios.create(
      Object.assign({}, defaultConfig, {
        method: 'get'

        // `params` 是即将与请求一起发送的 URL 参数
        // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
        /* params: {
          ID: 12345
        }, */
      })
    );
    // axiosInstance.defaults.headers.post['Content-Type'] =
    //   'application/x-www-form-urlencoded;charset=utf-8';
    const isInApp = axiosInstance.defaults.baseURL.indexOf(G.base_api) === 0; // 是否从平台发送请求
    if (!G.autonomously) {
      const token = G.token || null;
      if (token && isInApp) {
        axiosInstance.defaults.headers.common['Authorization'] = token;
      }
    }
    // 设置拦截器
    requestInterceptorHelper(axiosInstance, optional.requestInterceptor);
    responseInterceptorHelper(axiosInstance, optional.responseInterceptor);
    return axiosInstance(config);
  },

  // 对返回数据不做额外变换
  basePost: (config) => {
    const axiosInstance = axios.create(
      Object.assign({}, defaultConfig, {
        method: 'post',

        // `transformRequest` allows changes to the request data before it is sent to the server
        // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
        // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
        // FormData or Stream
        // You may modify the headers object.
        transformRequest: [
          (data, headers) => {
            return qs.stringify(data);
          }
        ]

        // `data` 是作为请求主体被发送的数据
        // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
        // 在没有设置 `transformRequest` 时，必须是以下类型之一：
        // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
        // - 浏览器专属：FormData, File, Blob
        // - Node 专属： Stream
        /* data: {
          firstName: 'Fred'
        }, */
      })
    );
    axiosInstance.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded;charset=utf-8';
    const isInApp = axiosInstance.defaults.baseURL.indexOf(G.base_api) === 0; // 是否从平台发送请求
    if (!G.autonomously) {
      const token = null;
      if (token && isInApp) {
        axiosInstance.defaults.headers['Authorization'] = `JWT ${token}`;
      }
    }
    // 设置拦截器
    requestInterceptorHelper(axiosInstance);
    responseInterceptorHelper(axiosInstance);
    return axiosInstance(config);
  },

  post: (config, optional = {}) => {
    const axiosInstance = axios.create(
      Object.assign({}, defaultConfig, {
        method: 'post',

        // `transformRequest` allows changes to the request data before it is sent to the server
        // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
        // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
        // FormData or Stream
        // You may modify the headers object.
        transformRequest: [
          (data, headers) => {
            return qs.stringify(data);
          }
        ]

        // `data` 是作为请求主体被发送的数据
        // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
        // 在没有设置 `transformRequest` 时，必须是以下类型之一：
        // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
        // - 浏览器专属：FormData, File, Blob
        // - Node 专属： Stream
        /* data: {
          firstName: 'Fred'
        }, */

        // `transformResponse` allows changes to the response data to be made before
        // it is passed to then/catch
        // v0.21.4下要取消这个transformResponse，不然返回数据会变成json字符串，原因未知
        /* transformResponse: [
          (data) => {
            return data;
          }
        ], */
      })
    );
    axiosInstance.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded;charset=utf-8';
    const isInApp = axiosInstance.defaults.baseURL.indexOf(G.base_api) === 0; // 是否从平台发送请求
    if (!G.autonomously) {
      const token = G.token || null;
      if (token && isInApp) {
        axiosInstance.defaults.headers.common['Authorization'] = token;
      }
    }
    // 设置拦截器
    requestInterceptorHelper(axiosInstance, optional.requestInterceptor);
    responseInterceptorHelper(axiosInstance, optional.responseInterceptor);
    return axiosInstance(config);
  },
  put: (config, optional = {}) => {
    const axiosInstance = axios.create(
      Object.assign({}, defaultConfig, {
        method: 'put',

        // `transformRequest` allows changes to the request data before it is sent to the server
        // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
        // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
        // FormData or Stream
        // You may modify the headers object.
        transformRequest: [
          (data, headers) => {
            return qs.stringify(data);
          }
        ]

        // `data` 是作为请求主体被发送的数据
        // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
        // 在没有设置 `transformRequest` 时，必须是以下类型之一：
        // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
        // - 浏览器专属：FormData, File, Blob
        // - Node 专属： Stream
        /* data: {
          firstName: 'Fred'
        }, */

        // `transformResponse` allows changes to the response data to be made before
        // it is passed to then/catch
        // v0.21.4下要取消这个transformResponse，不然返回数据会变成json字符串，原因未知
        /* transformResponse: [
          (data) => {
            return data;
          }
        ], */
      })
    );
    axiosInstance.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded;charset=utf-8';
    const isInApp = axiosInstance.defaults.baseURL.indexOf(G.base_api) === 0; // 是否从平台发送请求
    if (!G.autonomously) {
      const token = G.token || null;
      if (token && isInApp) {
        axiosInstance.defaults.headers.common['Authorization'] = token;
      }
    }
    // 设置拦截器
    requestInterceptorHelper(axiosInstance, optional.requestInterceptor);
    responseInterceptorHelper(axiosInstance, optional.responseInterceptor);
    return axiosInstance(config);
  },
  delete: (config, optional = {}) => {
    const axiosInstance = axios.create(
      Object.assign({}, defaultConfig, {
        method: 'delete',

        // `transformRequest` allows changes to the request data before it is sent to the server
        // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
        // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
        // FormData or Stream
        // You may modify the headers object.
        transformRequest: [
          (data, headers) => {
            return qs.stringify(data);
          }
        ]

        // `data` 是作为请求主体被发送的数据
        // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
        // 在没有设置 `transformRequest` 时，必须是以下类型之一：
        // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
        // - 浏览器专属：FormData, File, Blob
        // - Node 专属： Stream
        /* data: {
          firstName: 'Fred'
        }, */

        // `transformResponse` allows changes to the response data to be made before
        // it is passed to then/catch
        // v0.21.4下要取消这个transformResponse，不然返回数据会变成json字符串，原因未知
        /* transformResponse: [
          (data) => {
            return data;
          }
        ], */
      })
    );
    axiosInstance.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded;charset=utf-8';
    const isInApp = axiosInstance.defaults.baseURL.indexOf(G.base_api) === 0; // 是否从平台发送请求
    if (!G.autonomously) {
      const token = G.token || null;
      if (token && isInApp) {
        axiosInstance.defaults.headers.common['Authorization'] = token;
      }
    }
    // 设置拦截器
    requestInterceptorHelper(axiosInstance, optional.requestInterceptor);
    responseInterceptorHelper(axiosInstance, optional.responseInterceptor);
    return axiosInstance(config);
  }
};
