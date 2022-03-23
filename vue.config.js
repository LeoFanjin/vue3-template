const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 4000
    // proxy: 'http://localhost:3000'
    /* proxy: {
      'http://111.33.152.130:10102/iiprp': {
        target: 'http://localhost:3000',
        // pathRewrite: {"^/api": ""} // 将/api重写为""空字符串
      }
    } */
  },
  css: {
    sourceMap: process.env.NODE_ENV === 'development' ? true : false
  }
  // publicPath: '/ap/web/',
});
