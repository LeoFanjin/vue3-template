import { ElLoading } from 'element-plus';
export const useLoading = ({
  target = document.body,
  loadingText = '加载中'
} = {}) =>
  ElLoading.service({
    target,
    lock: true,
    text: loadingText,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
