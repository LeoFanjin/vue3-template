import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import { Storage, logout } from 'utils';

const routes = [
  {
    path: '/',
    name: 'Index',
    // route level code-splitting
    // this generates a separate chunk (index.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "index" */ '@/ap-base/index.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () =>
          import(
            /* webpackChunkName: "home" */ '@/ap-base/system/home/main.vue'
          )
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      },
      {
        path: '404',
        name: '_404',
        component: () =>
          import(
            /* webpackChunkName: "_404" */ '@/ap-base/system/error/404/main.vue'
          )
      }
    ],
    beforeEnter: (to, from, next) => {
      const user_info = Storage.get(G.storage_key);
      if (to && to.path !== G.loginPage) {
        if (_.isEmpty(user_info)) {
          logout();
        } else {
          next();
        }
      } else if (to && to.path === G.loginPage) {
        if (!_.isEmpty(user_info)) {
          next(G.homePage);
        } else {
          next();
        }
      } else {
        next();
      }
    },
    redirect: G.homePage
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/ap-base/system/login/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () =>
      import(/* webpackChunkName: "404" */ '@/ap-base/system/404/main.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHistory('/ap/web'),
  routes
});

export default router;
