module.exports = {
  path: 'about',
  name: 'About',
  component: () => import(/* webpackChunkName: "About" */ './main.vue')
};
