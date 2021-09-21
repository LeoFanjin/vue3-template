import _ from 'underscore';

const filters = {
  /**
   * 数据字典过滤器
   * @param array [{code: '', name: ''}];
   * @param code 字符串  字典项code
   * @returns {*|string}
   */
  dictFilter(array, code) {
    let result = code || '';

    if (_.isArray(array) && code) {
      let obj = _.findWhere(array, { code: code });
      result = obj ? obj.name : '';
    }

    return result;
  }
};

/**
 * 过滤器插件
 */
const Filters = {};
Filters.install = function(Vue) {
  /* 过滤器 */
  Vue.prototype.$filters = filters;
};

export default Filters;
