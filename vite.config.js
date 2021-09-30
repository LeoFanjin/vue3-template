import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import eslintPlugin from 'vite-plugin-eslint';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000
  },
  base: '/',
  resolve: {
    // 默认： '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    // resolve: [
    //   { find: /^@\//, replacement: path.resolve(process.cwd(), '/src') + '/' }
    // ]
  },
  build: {
    brotliSize: false // 关闭打包计算
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [ElementPlusResolver()]
    })
    // eslintPlugin()
  ]
});
