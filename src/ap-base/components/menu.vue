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
        <i v-if="!is_collapsed" class="icon iconfont icon-ap-navopen"></i>
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
                !is_collapsed &&
                item.children &&
                item.children.length > 0 &&
                !item.open
              "
              class="collapse-sign"
              ><i class="icon iconfont icon-ap-thinarrow-right"></i
            ></b>
            <b
              v-if="
                !is_collapsed &&
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
              :style="{ left: is_collapsed ? '90%' : '100%' }"
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
import { mapGetters } from 'vuex';
import _s from 'underscore.string';
import uuid from 'uuid';

export default {
  name: 's_menu',
  computed: {
    ...mapGetters(['getResource', 'getLoginInfo']),
    getFilteredResource() {
      return this.getResource.filter((item) => !item.model && !item.isPersonal);
    }
  },
  data() {
    return {
      is_collapsed: false,
      title: G.title
    };
  },
  watch: {
    $route: function (to) {
      if (!to.query.n) {
        this.authFilter(to);
      }
    }
  },
  created() {
    var self = this;

    if (self.$store.state.resource && self.$store.state.resource.length === 0) {
      self.$store
        .dispatch('queryMyResources', { system_code: G.system_code, tree: 1 })
        .then((data) => {
          var to = self.$route;

          if (data.length > 0) {
            data = _.chain(data)
              .map((item) => {
                return item.resourceCodeUrl;
              })
              .compact()
              .value();
            // 是否包含home
            var isContainsHome = _.contains(data, G.homePage);

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
          self.authFilter(to);
        })
        .catch(function () {
          var to = self.$route;
          self.authFilter(to);
        });
    } else {
      self.$store.commit('SET_SHOW_CONTENT', true);
      var to = self.$route;
      self.authFilter(to);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var self = this;
      document.querySelector('body').classList.remove('app-nav-collapsed');
      this.is_collapsed = false;

      var clientWidth = String(document.documentElement.clientWidth);
      self.widthControl(clientWidth);

      /* $(window).resize(function () {
          clientWidth = String(document.documentElement.clientWidth);
          self.widthControl(clientWidth);
        }); */
    },
    widthControl(width) {
      if (!this.is_collapsed && width <= 960) {
        this.closeNav();
      } else if (this.is_collapsed && width > 960) {
        this.openNav();
      }
    },
    openNav() {
      document.querySelector('body').classList.remove('app-nav-collapsed');
      this.is_collapsed = false;
    },
    closeNav() {
      document.querySelector('body').addClass('app-nav-collapsed');
      this.is_collapsed = true;
    },
    /* 收缩nav */
    shrinkage() {
      this.is_collapsed ? this.openNav() : this.closeNav();
    },

    authFilter(path, fullPath) {
      var to = {};

      if (!_.isObject(path)) {
        to.path = path;
        to.fullPath = fullPath;
      } else {
        to = path;
      }
      if (to && to.path) {
        var flag = false;

        if (_.contains(this.$store.state.auth_exception, to.path)) {
          flag = true;
        } else {
          _.each(this.getResource, (resource) => {
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
        this.activeMenu(to.fullPath);
        // } else {
        // this.activeMenu('/404');
        // this.$router.replace({path: '/404'});
        // }
        /* --END-- */
      }
    },
    /* 展开目录 */
    toggleMenu(resourceId, event) {
      var self = this;

      if (resourceId) {
        _.each(this.getResource, (resource) => {
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
            self.authFilter(resource.path, resource.path);
          } else {
            resource.open = false;
            _.each(resource.children, (cr) => {
              cr.hide = true;
            });
          }
        });
      }
    },
    /** 选中目录 **/
    activeMenu(fullPath, event) {
      var currentResource = {};

      if (fullPath && !event) {
        var cResource = this.$store.state.currentResource;

        if (
          !cResource ||
          _.isEmpty(cResource) ||
          !(fullPath === cResource.path) ||
          !event
        ) {
          var path = '';

          _.each(this.getResource, (resource) => {
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

          let routes = this.$router.options.routes;
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
            this.$store.dispatch('setCurrentResource', currentResource);
            this.$router.replace({ path: '/404' });
          } else if (path) {
            this.$store.dispatch('setCurrentResource', currentResource);
            this.$router.push({ path: fullPath });
          } else if (fullPath === '/404') {
            this.$store.dispatch('setCurrentResource', currentResource);
            this.$router.replace({ path: fullPath });
          }
        }
      }
    }
  }
};
</script>
