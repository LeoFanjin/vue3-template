import { Axios } from 'utils';

/***
 * 查询所有的组织机构及岗位
 */
export const queryOrganization = ({ commit }, params) => {
  const param = {
    url: '/ap-system/findOrganization.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/***
 * 保存组织机构
 */
export const saveOrgan = ({ commit }, params) => {
  const param = {
    url: '/ap-system/saveOrganization.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/***
 * 修改组织机构
 */
export const modifyOrgan = ({ commit }, params) => {
  const param = {
    url: '/ap-system/modifyOrganization.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/***
 * 删除组织机构
 */
export const removeOrgan = ({ commit }, params) => {
  const param = {
    url: '/ap-system/removeOrganization.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};
