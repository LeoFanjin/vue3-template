import _ from 'underscore';
export const getLoginInfo = (state) => {
  let userInfo = _.clone(state.loginInfo);

  if (!_.isEmpty(userInfo)) {
    if (userInfo.userHeadAddress) {
      userInfo.userHeadAddress = G.base_api + userInfo.userHeadAddress;
    } else {
      userInfo.userHeadAddress = state.default_head_img;
    }
  }
  return userInfo;
};
