<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import HelloWorld from './components/HelloWorld.vue';
import JsxDemo from './components/jsxDemo.jsx';
// import {Axios} from '@/common/utils/index.js';
const date = ref(null);
</script>

<template>
  <el-config-provider :locale="locale">
    <img alt="Vue logo" src="./assets/logo.png" />
    <el-button type="primary">Plus</el-button>
    <el-date-picker v-model="date" placeholder="选择日期"></el-date-picker>
    <HelloWorld msg="Hello Vue 3 + Vite" />
    <JsxDemo />
  </el-config-provider>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
