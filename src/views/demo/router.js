module.exports = {
  path: 'demo',
  name: 'demo',
  component: () => import(/* webpackChunkName: "demo" */ './main.vue')
};
