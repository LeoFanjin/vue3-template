import _ from 'underscore';

export const getCurrentResource = (state) => {
  return state.currentResource;
};

export const getResource = (state) => {
  if (!_.findWhere(state.resource, { path: '/home' }) && G.homeLocation) {
    var home = {
      id: '999',
      isActive: false,
      name: '首页',
      path: '/home',
      open: false,
      icon: 'icon-ap-homepage'
    };

    if (G.homeLocation === 'top') {
      home.isPersonal = true;
    }

    state.resource.unshift(home);
  }

  /* var personalResource = [
    { id: "104", isActive: false, name: "头像设置", path: "/personal/head", hide: true, isPersonal: true },
    { id: "101", isActive: false, name: "我的权限", path: "/personal/myAuth", hide: true, isPersonal: true },
    { id: "102", isActive: false, name: "安全设置", path: "/personal/securitySetting", hide: true, isPersonal: true },
    { id: "103", isActive: false, name: "个人信息", path: "/personal/userInfo", hide: true, isPersonal: true },
  ];
  var releaseResource = [
    { id: "888", isActive: false, name: "版本控制", path: "/releaseMessage", hide: true, isPersonal: true },
  ]; */

  state.resource = _.union(state.resource);

  return state.resource;
};

export const getLinkResource = (state) => {
  return state.linkResource;
};
