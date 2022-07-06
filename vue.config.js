const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
// const unpluginElement = require('unplugin-element-plus/webpack');
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
  },
  // publicPath: '/ap/web/',
  configureWebpack: (config) => {
    config.resolve.modules.push('common_modules');
    // 解决vue-i18n警告
    // You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
    config.resolve.alias['vue-i18n'] = 'vue-i18n/dist/vue-i18n.cjs.js';
    // 初始配置里已有类型：'.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'
    config.resolve.extensions.push('.ts', '.tsx');
    // 解决出现vueuse模块找不到的问题
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    });
    // element自动导入
    config.plugins.push(
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            exclude: new RegExp(/^(?!.*loading-directive).*$/) // v-loading样式处理
          })
        ]
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        directoryAsNamespace: true
      })
      // 样式自动引入(没用上)
      // unpluginElement()
    );
    config.plugins.push(
      new webpack.ProvidePlugin({
        _: 'underscore',
        G: path.join(__dirname, './src/config/g.js')
      })
    );
    if (process.env.NODE_ENV === 'production') {
      config.devtool = 'cheap-module-source-map';
      // 减小element多语言包的大小
      // TMD这玩意儿报错！！
      // config.plugins.push(
      //   new webpack.NormalModuleReplacementPlugin(
      //     /element-plus[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]en/,
      //     'element-plus/lib/locale/lang/zh-cn'
      //   )
      // );
      const productionGzipExtensions = ['html', 'js', 'css'];
      config.plugins.push(
        // Gzip压缩
        new CompressionWebpackPlugin({
          // filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
      );
      // 打包分析工具
      if (process.env.npm_config_report) {
        const BundleAnalyzerPlugin =
          require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
        config.plugins.push(new BundleAnalyzerPlugin());
      }
    }
  }
  /* chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '平台';
      return args;
    });
  } */
});
