import { Axios } from 'utils';

/**
 * 查询我的资源权限
 * @param commit
 * @param params
 * @returns {*}
 */
/* export const queryMyResources = ({ commit }, params) => {
  const param = {
    url: G.base_api + '/ap-system/getUserResourceList.do',
    dataType: 'json',
    data: params
  };

  return API.post(param).then(function(data) {
    console.log(data);
    if (data) {
      commit('SET_RESOURCE', data);
      commit('SET_SHOW_CONTENT', true);
    }

    return Promise.resolve(data);
  });
}; */
export const queryMyResources = ({ commit }, params) => {
  const param = {
    url: '/ap-system/getUserResourceList.do',
    data: params
  };
  return Axios.post(param).then((data) => {
    if (data) {
      commit('SET_RESOURCE', data);
      commit('SET_SHOW_CONTENT', true);
    }
    return Promise.resolve(data.data);
  });
};

/**
 * 查询我的权限
 */
export const findMyAuth = ({ commit }, content) => {
  const param = {
    url: G.base_api + '/ap-system/getUserAuthList.do',
    data: content,
    commit: commit,
    dataType: 'json'
  };
  return API.post(param);
};
/**
 * 导出角色
 */
export const exportRole = ({ commit }, content) => {
  const param = {
    url: G.base_api + '/ap-system/exportRole',
    data: content,
    commit: commit,
    timeout: 120000,
    dataType: 'json'
  };
  return API.post(param);
};
