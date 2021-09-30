import { Axios } from 'utils';

/***
 * 获取全部角色
 */
export const queryAllRole = ({ commit }, params) => {
  const param = {
    url: '/ap-system/findRole.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 根据用户查询角色
 */
export const queryRoleByUser = ({ commit }, params) => {
  const param = {
    url: '/ap-system/findUserRole.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/***
 * 保存角色信息
 */
export const saveRole = ({ commit }, params) => {
  const param = {
    url: '/ap-system/saveRole.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/***
 * 修改角色信息
 */
export const modifyRole = ({ commit }, params) => {
  const param = {
    url: '/ap-system/modifyRole.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/***
 * 删除角色信息
 */
export const removeRole = ({ commit }, params) => {
  const param = {
    url: '/ap-system/removeRole.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/**
 * 绑定角色信息
 */
export const saveRoleBind = ({ commit }, params) => {
  const param = {
    url: '/ap-system/saveUserRoleRel.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};
