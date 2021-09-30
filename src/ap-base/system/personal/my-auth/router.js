const myAuth = (resolve) => require(['./main.vue'], resolve);

module.exports = {
  path: 'myAuth',
  component: myAuth
};
