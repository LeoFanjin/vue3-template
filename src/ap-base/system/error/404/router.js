const _404 = (resolve) => require(['./main'], resolve);

module.exports = {
  path: '/404',
  component: _404
};
