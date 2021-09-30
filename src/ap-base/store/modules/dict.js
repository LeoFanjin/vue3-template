import { constant } from 'utils';
import _ from 'underscore';
export const dictState = {
  [constant.dict_type.RESOURCE_TYPE]: [],
  isInit: false
};

export const dictMutation = {
  /**
   * 设置数据字典项
   * @param state
   * @param obj {key: dictType, value: value}
   */
  SET_DICT(state, obj) {
    if (obj.key && obj.value) {
      state[obj.key] = obj.value;
    }
  },
  INIT_DICT(state, dictArray) {
    if (_.isArray(dictArray)) {
      dictArray = _.sortBy(dictArray, 'libraryCode');
      _.each(dictArray, function (item) {
        if (item.libraryParentId === '0') {
          state[item.libraryCode] = _.filter(
            dictArray,
            (cItem) => cItem.libraryParentId === item.libraryId
          );
        }
      });
      state.isInit = true;
    }
  }
};
