import { Axios } from 'utils';

/**
 * 查询所有资源
 */
export const queryResource = ({ commit }, params) => {
  var param = {
    url: '/ap-system/findResource.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 查询资源详情
 */
export const queryResourceDetail = ({ commit }, params) => {
  var param = {
    url: '/ap-system/findResourceInfo.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 删除资源
 */
export const removeResource = ({ commit }, params) => {
  var param = {
    url: '/ap-system/removeResource.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 添加资源
 */
export const addResource = ({ commit }, params) => {
  var param = {
    url: '/ap-system/saveResource.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 修改资源
 */
export const modifyResource = ({ commit }, params) => {
  var param = {
    url: '/ap-system/modifyResource.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 切换岗位/组织机构位置
 */
export const changePositionByResource = ({ commit }, params) => {
  var param = {
    url: '/ap-system/sortResource.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};
