const userInfo = (resolve) => require(['./main.vue'], resolve);

module.exports = {
  path: 'userInfo',
  component: userInfo
};
