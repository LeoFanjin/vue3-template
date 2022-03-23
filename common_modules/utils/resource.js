import _ from 'underscore';
import _s from 'underscore.string';
import { constant } from './constant';

function getChildren(parentId, resources) {
  const child = [];

  _.each(resources, function (resource) {
    if (resource.parentId === parentId) {
      resource.children = getChildren(resource.id, resources);
      child.push(resource);
    }
  });

  return child;
}

export const resource = {
  /**
   * 选中资源
   * obj: 实例对象
   * fullpath: 路由完整路径
   * errorPage: 错误页面
   */
  activeMenu(obj, fullPath, errorPage, event) {
    let currentResource = {};

    function cf(resource) {
      if (resource.path && _s(fullPath).startsWith(resource.path)) {
        currentResource = {
          id: resource.id,
          name: resource.name,
          path: resource.path,
          status: resource.status
        };
        path = resource.path;
        resource.isActive = true;
      } else {
        resource.isActive = false;
      }

      _.each(resource.children, function (cr) {
        if (cr.path && _s(fullPath).startsWith(cr.path)) {
          cr.isActive = true;
          resource.isActive = true;
          currentResource = {
            pid: resource.id,
            pname: resource.name,
            id: cr.id,
            name: cr.name,
            path: cr.path,
            status: cr.status
          };

          path = cr.path;
        } else {
          cr.isActive = false;
        }
      });
    }

    if (fullPath && !_s.startsWith(fullPath, errorPage)) {
      let cResource = obj.store.state.currentResource;

      if (
        !cResource ||
        _.isEmpty(cResource) ||
        !(fullPath === cResource.path) ||
        !event
      ) {
        let path = '';

        _.each(obj.store.getters.getResource, function (resource) {
          cf(resource);
        });

        // if (_.isEmpty(currentResource)) {
        _.each(obj.store.getters.getLinkResource, function (resource) {
          cf(resource);
        });
        // }

        // 判断资源状态
        if (!_.isEmpty(currentResource) && currentResource.status !== '1') {
          obj.router.push({
            path: errorPage,
            query: { status: currentResource.status }
          });
        } else if (path) {
          obj.store.dispatch('setCurrentResource', currentResource);
          obj.router.push({ path: fullPath });
        }
      }
    }
  },

  /**
   * 根据资源生成目录结构
   */
  generateMenus(resources) {
    resources = _.chain(resources)
      .map((resource) => ({
        id: resource.resourceId,
        name: resource.resourceName,
        path: resource.resourceAddress,
        icon: resource.resourceIconAddress,
        code: resource.resourceCode,
        type: resource.resourceType,
        parentId: resource.resourceParentId,
        level: resource.resourceLevel,
        original: resource,
        hide: true,
        open: false,
        isActive: false
      }))
      .groupBy('type')
      .value();

    // 系统资源
    let systemMenus = [];

    _.each(resources[constant.resource_type.system], (menu) => {
      if (menu.parentId === '0' || !menu.parentId) {
        menu.children = getChildren(
          menu.id,
          resources[constant.resource_type.system]
        );
        systemMenus.push(menu);
      }
    });

    // 链接资源
    let linkMenus = [];

    _.each(resources[constant.resource_type.link], (menu) => {
      if (menu.parentId === '0' || !menu.parentId) {
        menu.children = getChildren(
          menu.id,
          resources[constant.resource_type.link]
        );
        linkMenus.push(menu);
      }
    });

    // 外部资源
    let externalMenus = [];

    _.each(resources[constant.resource_type.external], (menu) => {
      if (menu.parentId === '0' || !menu.parentId) {
        menu.children = getChildren(
          menu.id,
          resources[constant.resource_type.external]
        );
        externalMenus.push(menu);
      }
    });

    // 其他资源
    let otherMenus = [];

    _.each(resources[constant.resource_type.other], (menu) => {
      if (menu.parentId === '0' || !menu.parentId) {
        menu.children = getChildren(
          menu.id,
          resources[constant.resource_type.other]
        );
        otherMenus.push(menu);
      }
    });

    return { systemMenus, linkMenus, externalMenus, otherMenus };
  }
};
