/**
 * 获得原始类型, e.g., [object Object].
 */
const _toString = Object.prototype.toString;

/**
 * 获得类型, e.g., String, Object...
 * @param
 * value: any
 * @return
 * String
 */
export const toRawType = (value) => {
  return _toString.call(value).slice(8, -1);
};

/**
 * 判断是否是Object
 * @param
 * obj: any
 * @return
 * Boolean
 */
export function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
