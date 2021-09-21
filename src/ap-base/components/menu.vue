<style scoped>
.collapse-sign {
  font-size: 12px;
  padding-top: 3px;
}
</style>
<template>
  <div class="app-side-nav">
    <div class="app-side-nav__nav">
      <div class="app-side-nav-fold" @click="shrinkage">
        <i v-if="!isCollapsed" class="icon iconfont icon-ap-navopen"></i>
        <i v-else class="icon iconfont icon-ap-navclose"></i>
      </div>
      <ul :style="{ height: $store.state.min_height + 'px' }">
        <li
          v-for="item in getFilteredResource"
          :key="item.id"
          :class="{ active: item.isActive, open: item.open }"
        >
          <a
            href="javascript:void(0)"
            :title="item.name"
            @click="toggleMenu(item.id, false)"
          >
            <b
              v-if="
                !isCollapsed &&
                item.children &&
                item.children.length > 0 &&
                !item.open
              "
              class="collapse-sign"
              ><i class="icon iconfont icon-ap-thinarrow-right"></i
            ></b>
            <b
              v-if="
                !isCollapsed &&
                item.children &&
                item.children.length > 0 &&
                item.open
              "
              class="collapse-sign"
              ><i class="icon iconfont icon-ap-thinarrow-down"></i
            ></b>
            <i v-if="item.icon" class="icon iconfont" :class="item.icon"></i>
            <i v-else class="icon iconfont icon-ap-menu"></i>
            <span class="menu-item-parent">{{ item.name }}</span>
          </a>
          <transition name="slide" mode="out-in">
            <ul
              v-if="item.children && item.children.length > 0 && item.open"
              :style="{ left: isCollapsed ? '90%' : '100%' }"
            >
              <li
                v-for="cItem in item.children"
                :key="cItem.id"
                :class="{ active: cItem.isActive }"
              >
                <a
                  href="javascript:void(0)"
                  :title="cItem.name"
                  @click="authFilter(cItem.path, cItem.path)"
                >
                  <i
                    v-if="cItem.icon"
                    class="icon iconfont"
                    :class="cItem.icon"
                  ></i>
                  <i v-else class="icon iconfont icon-ap-navsetting"></i>
                  <span class="menu-item-parent">{{ cItem.name }}</span>
                </a>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import _s from 'underscore.string';

export default defineComponent({
  name: 's_menu',
  setup() {
    const store = useStore(),
      router = useRouter(),
      route = useRoute();

    /* data */
    const isCollapsed = ref(false);

    /* computed */
    const getLoginInfo = computed(() => store.getters.getLoginInfo);
    const getResource = computed(() => store.getters.getResource);
    const getFilteredResource = computed(() =>
      store.getters.getResource.filter(
        (item) => !item.model && !item.isPersonal
      )
    );

    /* watch */
    watch(route, (to) => {
      if (!to.query.n) {
        authFilter(to);
      }
    });

    /* methods */
    const authFilter = (path, fullPath) => {
      let to = {};

      if (!_.isObject(path)) {
        to.path = path;
        to.fullPath = fullPath;
      } else {
        to = path;
      }
      if (to && to.path) {
        let flag = false;

        if (_.contains(store.state.auth_exception, to.path)) {
          flag = true;
        } else {
          _.each(getResource.value, (resource) => {
            if (resource.path && _s(to.fullPath).startsWith(resource.path)) {
              flag = true;
            }

            _.each(resource.children, (cr) => {
              if (cr.path && _s(to.fullPath).startsWith(cr.path)) {
                flag = true;
              }
            });
          });
        }

        /* 如果没有资源菜单页面及其下级页面之外的页面，不用注释这里的判断 */
        /* --BEGIN-- */
        // if ((flag || (to.path === "/home" && G.homeLocation))) {
        activeMenu(to.fullPath);
        // } else {
        // activeMenu('/404');
        // router.replace({path: '/404'});
        // }
        /* --END-- */
      }
    };

    // 选中目录
    const activeMenu = (fullPath, event) => {
      let currentResource = {};

      if (fullPath && !event) {
        let cResource = store.state.currentResource;

        if (
          !cResource ||
          _.isEmpty(cResource) ||
          !(fullPath === cResource.path) ||
          !event
        ) {
          let path = '';

          _.each(getResource.value, (resource) => {
            if (resource.path && _s(fullPath).startsWith(resource.path)) {
              currentResource = {
                id: resource.id,
                name: resource.name,
                path: resource.path
              };
              path = resource.path;
              resource.isActive = true;
            } else {
              resource.isActive = false;
            }

            _.each(resource.children, (cr) => {
              if (cr.path && _s(fullPath).startsWith(cr.path)) {
                cr.isActive = true;
                resource.isActive = true;
                resource.open = true;
                currentResource = {
                  pid: resource.id,
                  pname: resource.name,
                  id: cr.id,
                  name: cr.name,
                  path: cr.path
                };

                path = cr.path;
              } else {
                cr.isActive = false;
              }
            });
          });

          // 获取所有已注册路由的路径
          let getAllPath = function (routes, parentPath) {
            let paths = [];

            _.each(routes, function (route) {
              let prefix = parentPath === '/' ? '' : parentPath;
              if (route.path.indexOf('/') !== 0 && route.path !== '*') {
                prefix += '/';
              }
              paths.push(prefix + route.path);
              if (route.children) {
                paths = _.union(
                  paths,
                  getAllPath(route.children, prefix + route.path)
                );
              }
            });

            return paths;
          };

          let routes = router.options.routes;
          let routePaths = getAllPath(routes, '');

          /* 如果没有资源页面及其下级页面之外的页面，这几行可以去掉 */
          /* --BEGIN-- */
          if (path === '') {
            if (fullPath.indexOf('?') > -1) {
              path = fullPath.substring(0, fullPath.indexOf('?'));
            } else {
              path = fullPath;
            }
          }
          /* --END-- */
          if (!_.contains(routePaths, path)) {
            store.dispatch('setCurrentResource', currentResource);
            router.replace({ path: '/404' });
          } else if (path) {
            store.dispatch('setCurrentResource', currentResource);
            router.push({ path: fullPath });
          } else if (fullPath === '/404') {
            store.dispatch('setCurrentResource', currentResource);
            router.replace({ path: fullPath });
          }
        }
      }
    };

    const widthControl = (width) => {
      if (!isCollapsed.value && width <= 960) {
        closeNav();
      } else if (isCollapsed.value && width > 960) {
        openNav();
      }
    };
    const openNav = () => {
      document.querySelector('body').classList.remove('app-nav-collapsed');
      isCollapsed.value = false;
    };
    const closeNav = () => {
      document.querySelector('body').classList.add('app-nav-collapsed');
      isCollapsed.value = true;
    };
    // 收缩nav
    const shrinkage = () => {
      isCollapsed.value ? openNav() : closeNav();
    };
    // 展开目录
    const toggleMenu = (resourceId, event) => {
      if (resourceId) {
        _.each(getResource.value, (resource) => {
          if (
            resource.children &&
            resource.children.length > 0 &&
            resourceId === resource.id
          ) {
            resource.open = !resource.open;

            _.each(resource.children, (cr) => {
              cr.hide = !resource.open;
            });
          } else if (resource.path && resourceId === resource.id) {
            authFilter(resource.path, resource.path);
          } else {
            resource.open = false;
            _.each(resource.children, (cr) => {
              cr.hide = true;
            });
          }
        });
      }
    };

    const init = () => {
      document.querySelector('body').classList.remove('app-nav-collapsed');
      isCollapsed.value = false;

      let clientWidth = String(document.documentElement.clientWidth);
      widthControl(clientWidth);

      window.onresize = function () {
        clientWidth = String(document.documentElement.clientWidth);
        widthControl(clientWidth);
      };
    };

    /* mounted */
    onMounted(() => {
      init();
    });

    /* created */
    if (store.state.resource && store.state.resource.length === 0) {
      store
        .dispatch('queryMyResources', { system_code: G.system_code, tree: 1 })
        .then((data) => {
          let to = route;

          if (data.length > 0) {
            data = _.chain(data)
              .map((item) => {
                return item.resourceCodeUrl;
              })
              .compact()
              .value();
            // 是否包含home
            let isContainsHome = _.contains(data, G.homePage);

            if (
              G.homePage === to.path &&
              G.homePage !== '/home' &&
              !isContainsHome &&
              data[0]
            ) {
              to = {
                path: data[0],
                fullPath: data[0]
              };
            }
          }
          authFilter(to);
        })
        .catch(() => {
          authFilter(route);
        });
    } else {
      store.commit('SET_SHOW_CONTENT', true);
      authFilter(route);
    }

    return {
      isCollapsed,
      getLoginInfo,
      // getResource,
      getFilteredResource,
      shrinkage,
      toggleMenu
    };
  }
});
</script>
