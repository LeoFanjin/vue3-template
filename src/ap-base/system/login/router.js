const login = (resolve) => require(['./main'], resolve);

module.exports = [
  {
    path: '/login',
    component: login
  }
];
