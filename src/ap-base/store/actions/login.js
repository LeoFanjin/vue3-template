import { Axios } from 'utils';

/** 登录*/
export const login = ({ commit }, formLogin) => {
  var param = {
    url: '/ap-system/UserLogin.do',
    data: formLogin,
    commit: commit
  };

  return Axios.post(param).then(function (data) {
    if (data) {
      // data = {data: data};
      if (data.data.userHeadEntity && !_.isEmpty(data.data.userHeadEntity)) {
        data.data.userEntity.userHeadAddress =
          data.data.userHeadEntity.userHeadAddress;
      }
      if (data.organizationEntity && data.userEntity) {
        data.userEntity.organ = data.organizationEntity;
      }
      commit('LOGIN', data.data.userEntity); //用户信息
      commit('SET_OPTIONS', data.data.operationEntities); //操作信息
      commit('SET_TOKEN', data.token || '1234567890'); //token信息
      return Promise.resolve(data.data);
    } else {
      throw '登录失败';
    }
  });
};

/** 退出 */
export const logout = ({ commit }) => {
  var params = {
    url: '/ap-system/logout.do',
    data: {},
    commit: commit
  };

  return Axios.basePost(params).then(function () {
    commit('LOGOUT_USER');
    return Promise.resolve(null);
  });
};
