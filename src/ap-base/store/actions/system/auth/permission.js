import { Axios } from 'utils';

/***
 * 获取全部许可
 */
export const queryAllPermission = ({ commit }, params) => {
  const param = {
    url: '/ap-system/findPermission.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 根据用户查询许可
 */
export const queryPermissionByUser = ({ commit }, params) => {
  const param = {
    url: '/ap-system/findPermissionByUser.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 根据组织查询许可
 */
export const queryPermissionByOrgan = ({ commit }, params) => {
  const param = {
    url: '/ap-system/findPermissionByOrgan.do',
    commit: commit,
    data: params
  };

  return Axios.post(param);
};

/**
 * 查询许可以及操作
 */
export const findPermissionByRole = ({ commit }, params) => {
  const param = {
    url: '/ap-system/findPermissionByRole.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 保存许可信息
 */
export const savePermission = ({ commit }, params) => {
  const param = {
    url: '/ap-system/savePermission.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 删除许可信息
 */
export const removePermission = ({ commit }, params) => {
  const param = {
    url: '/ap-system/removePermission.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 修改许可信息
 */
export const modifyPermission = ({ commit }, params) => {
  const param = {
    url: '/ap-system/modifyPermission.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 为用户绑定许可
 */
export const bindPermissionUser = ({ commit }, params) => {
  const param = {
    url: '/ap-system/saveUserPermissionRel.do',
    commit: commit,
    data: params
  };

  return Axios.post(param);
};

/**
 * 绑定组织绑定许可
 */
export const bindPermissionOrgan = ({ commit }, params) => {
  const param = {
    url: '/ap-system/savePermissionOrganRel.do',
    commit: commit,
    data: params
  };

  return Axios.post(param);
};

/**
 * 为角色绑定许可
 */
export const bindPermissionRole = ({ commit }, params) => {
  const param = {
    url: '/ap-system/savePermissionRoleRel.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};
