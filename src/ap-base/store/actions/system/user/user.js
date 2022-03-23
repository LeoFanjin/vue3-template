import { Axios } from 'utils';

/**
 * 用户列表
 */
export const queryEmployeeInfoList = ({ commit }, content) => {
  if (content.userAccount) {
    content.userAccount += ':f';
  }

  const param = {
    url: '/ap-system/findUser.do',
    data: content,
    commit: commit
  };
  return Axios.post(param);
};

/**
 * 新增用户
 */
export const saveUserRegInfo = ({ commit }, content) => {
  const param = {
    url: '/ap-system/saveUser.do',
    data: content,
    commit: commit
  };
  return Axios.post(param);
};

/**
 * 查询用户详情
 */
export const queryEmployeeInfoDetail = ({ commit }, content) => {
  const param = {
    url: '/ap-system/findUserInfo.do',
    data: content,
    commit: commit
  };
  return Axios.post(param);
};

/**
 * 更新用户详情
 */
export const modifyUserRegInfo = ({ commit }, content) => {
  const param = {
    url: '/ap-system/modifyUser.do',
    data: content,
    commit: commit
  };
  return Axios.post(param);
};

/**
 * 删除用户（单个删除）
 */
export const removeEmployeeInfo = ({ commit }, content) => {
  const param = {
    url: '/ap-system/removeUser.do',
    data: content,
    commit: commit
  };
  return Axios.post(param);
};

/**
 * 密码初始化
 */
export const initPassword = ({ commit }, content) => {
  const param = {
    url: '/ap-system/initUserPassword.do',
    data: content,
    commit: commit
  };
  return Axios.post(param);
};

/**
 * 修改密码
 */
export const modifyPassword = ({ commit }, content) => {
  const param = {
    url: '/ap-system/settingUserPassword.do',
    data: content,
    commit: commit
  };
  return Axios.post(param);
};

/**
 * 修改我的信息
 */
export const modifyMyInfo = ({ commit }, content) => {
  const param = {
    url: '/ap-system/modifyUserInfo.do',
    data: content,
    commit: commit
  };

  return Axios.post(param).then(() => {
    commit('UPDATE_MY_INFO', content);
    return Promise.resolve(null);
  });
};

/**
 * 查询用户头像
 */
export const findUserHead = ({ commit }, content) => {
  const param = {
    url: '/ap-system/findUserHeadImage.do',
    data: content,
    commit: commit
  };

  return Axios.post(param);
};

/**
 * 删除用户头像
 */
export const removeUserHead = ({ commit }, content) => {
  const param = {
    url: '/ap-system/removeUserHeadImage.do',
    data: content,
    commit: commit
  };
  return Axios.post(param);
};

/**
 * 设置用户头像
 */
export const setUserHead = ({ commit }, userImgPath) => {
  commit('SET_USER_HEAD', userImgPath);
};
