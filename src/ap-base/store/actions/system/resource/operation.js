import { Axios } from 'utils';

/**
 * 查询对应操作
 */
export const queryOperation = ({ commit }, params) => {
  var param = {
    url: '/ap-system/findOperation.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 添加对应操作
 */
export const addOperation = ({ commit }, params) => {
  var param = {
    url: '/ap-system/saveOperation.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 删除对应操作
 */
export const removeOperation = ({ commit }, params) => {
  var param = {
    url: '/ap-system/removeOperation.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 修改对应操作
 */
export const modifyOperation = ({ commit }, params) => {
  var param = {
    url: '/ap-system/modifyOperation.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 为许可绑定操作
 */
export const bindPermissionOpe = ({ commit }, params) => {
  var param = {
    url: '/ap-system/savePermissionOperationRel.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 根据许可查询操作
 */
export const queryOperationsByPermission = ({ commit }, params) => {
  var param = {
    url: '/ap-system/findOperationByPermission.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};
