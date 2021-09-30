const _404 = (resolve) => require(['./main'], resolve);

module.exports = [
  {
    path: '*',
    component: _404
  }
];
