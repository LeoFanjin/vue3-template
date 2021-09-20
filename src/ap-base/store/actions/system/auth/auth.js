import { Axios } from 'utils';

/***
 * 获取全部组织机构及人员
 */
export const queryAuthOrganization = ({ commit }, params) => {
  const param = {
    url: '/ap-system/findUserOrganizationTree.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};

/***
 * 获取全部资源（包含操作）
 */
export const queryAllResource = ({ commit }, params) => {
  const param = {
    url: '/ap-system/findResourceOperationTree.do',
    commit: commit,
    data: params
  };
  return Axios.post(param);
};
