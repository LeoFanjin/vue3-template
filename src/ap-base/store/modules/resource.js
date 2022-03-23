import { resource as resourceUtil } from 'utils';

export const resourceState = {
  resourceList: [],
  // 资源列表
  resource: G.isRelyAPI ? [] : G.localResource,
  // 链接资源
  linkResource: [],
  // 外部资源
  externalResource: [],
  // 其他资源
  otherResource: [],
  // 当前资源
  currentResource: {},
  showContent: true
};

export const resourceMutation = {
  SET_CURRENT_RESOURCE(state, currentResource) {
    state.currentResource = currentResource;
  },
  SET_RESOURCE(state, resources) {
    let { systemMenus, linkMenus, externalMenus, otherMenus } =
      resourceUtil.generateMenus(resources);

    state.resource = systemMenus;
    state.linkResource = linkMenus;
    state.externalResource = externalMenus;
    state.otherResource = otherMenus;
  },
  SET_SHOW_CONTENT(state, flag) {
    state.showContent = flag;
  }
};
