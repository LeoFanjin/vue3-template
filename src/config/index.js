/**
 * 在执行单点登录前在G.js中获取对应的base_api等变量
 */

// let appConfig = null;

// if (process.env.NODE_ENV === 'production') {
//   // appConfig = () =>
//   //   import(/* webpackChunkName: "env-production" */ 'env.production');
//   appConfig = require('./env.production').default;
// } else {
//   // appConfig = () =>
//   //   import(/* webpackChunkName: "env-development" */ './env.development');
//   appConfig = require('./env.development').default;
// }
// 动态路径会把所有环境下的文件打包进去
// 使用[request]来告诉webpack，这里的值是根据后面传入的字符串来决定
// const env = process.env.NODE_ENV || 'development';
// let envConfig = () => import(/* webpackChunkName: "[request]" */ `./env.${env}`);
// let envConfig = require(`./env.${env}`).default;

const appConfig = require(`./env.${process.env.VUE_APP_SYS_ENV || 'development'}`).default;
export default appConfig;
