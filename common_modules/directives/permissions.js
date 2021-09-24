/**
 * 权限验证指令
 * demo:  v-permissions="true", v-permissions:[arg]="true"
 */
import { toRawType } from '../utils';

let rawDisplay = null; // 节点原始显示
function handleElVisiblity(el, isShow, showArg) {
  if (!isShow) {
    // el不可见
    if (!showArg) {
      // 不传显示方式则移除节点
      el.parentNode.removeChild(el);
    } else if (toRawType(showArg) === 'String') {
      if (showArg === 'display') {
        el.style.display = 'none';
      } else if (showArg === 'visibility') {
        el.style.visibility = 'hidden';
      }
    }
  } else {
    // el可见
    if (toRawType(showArg) === 'String') {
      if (showArg === 'display') {
        el.style.display = rawDisplay || 'block';
      } else if (showArg === 'visibility') {
        el.style.visibility = 'visible';
      }
    }
  }
}
export const permissions = {
  /**
   * 根据权限显示隐藏特定节点
   * @param {*} el dom节点
   * @param {*} binding: {
   *  value: 传入的第一个参数,
   *  arg: 动态参数, string, 值为display或visibility
   *  dir: 处理函数对象
   *  modifiers: 修饰符
   *  instance: 当前实例
   * }
   */
  mounted(el, binding) {
    const value = binding.value || true,
      arg = binding.arg;
    rawDisplay = el.style.display;
    if (toRawType(value) === 'Boolean') {
      handleElVisiblity(el, value, arg);
    } else {
      el.parentNode.removeChild(el);
    }
  },
  updated(el, binding) {
    const value = binding.value,
      arg = binding.arg;
    if (toRawType(value) === 'Boolean') {
      handleElVisiblity(el, value, arg);
    }
  }
};
