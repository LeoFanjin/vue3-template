import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/Home.vue';

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
        path: '404',
        name: '_404',
        component: () =>
          import(
            /* webpackChunkName: "_404" */ '@/ap-base/system/error/404/main.vue'
          )
      }
    ],
    /* beforeEnter: (to, from, next) => {
      let user_info = Storage.get(G.storage_key);
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
      }
      next();
    }, */
    redirect: G.homePage
  },
  /* {
    path: '/',
    name: 'Home',
    component: Home
  }, */
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/ap-base/system/login/main.vue')
  }
  // {
  //   path: '*',
  //   name: '404',
  //   component: () =>
  //     import(/* webpackChunkName: "404" */ '@/ap-base/system/404/main.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
