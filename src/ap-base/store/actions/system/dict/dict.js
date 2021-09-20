import { Axios } from 'utils';

/**
 * 根据类型查询数据字典项
 * @params: {itemCode: ''}
 */
export const queryDataItemByType = (store, params) => {
  let key = params.libraryCode;

  if (key) {
    if (!store.state[key] || store.state[key].length === 0) {
      const param = {
        url: '/ap-system/findChildLibrary.do',
        commit: store.commit,
        data: params
      };

      return Axios.post(param).then(function (data) {
        if (data && data.length > 0) {
          store.commit('SET_DICT', { key: params.libraryCode, value: data });
        }
        return Promise.resolve(data);
      });
    } else {
      return Promise.resolve(store.state[key]);
    }
  } else {
    return Promise.resolve([]);
  }
};

/**
 * 查询数据字典
 */
export const queryDataItemList = ({ commit }, params) => {
  const param = {
    url: '/ap-system/findLibrary.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 新增数据字典
 */
export const saveDict = ({ commit }, params) => {
  const param = {
    url: '/ap-system/saveLibrary.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 修改数据字典
 */
export const modifyDataItemById = ({ commit }, params) => {
  const param = {
    url: '/ap-system/modifyLibrary.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 删除数据字典
 */
export const removeDataItemById = ({ commit }, params) => {
  const param = {
    url: '/ap-system/removeLibrary.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/* export const initDict = ({ commit, state }, params) => {
  if (!state.isInit) {
    const param = {
      url: G.base_api + '/ap-system/findLibrary.do',
      dataType: 'json',
      commit: commit,
      data: params
    };

    return API.post(param).then(function(data) {
      if (_.isArray(data)) {
        commit('INIT_DICT', data);
        return Promise.resolve(null);
      }
    });
  } else {
    return Promise.resolve(null);
  }
}; */

export const initDict = ({ commit, state }, params) => {
  if (!state.isInit) {
    const param = {
      url: '/ap-system/findLibrary.do',
      commit: commit,
      data: params
    };

    Axios.post(param).then((data) => {
      if (_.isArray(data)) {
        commit('INIT_DICT', data);
        return Promise.resolve(null);
      }
    });
  } else {
    return Promise.resolve(null);
  }
};
