const personal = (resolve) => require(['./main.vue'], resolve);

module.exports = {
  path: '/personal',
  children: [
    require('./head/router'),
    require('./my-auth/router'),
    require('./security-setting/router'),
    require('./user-info/router')
  ],
  component: personal,
  redirect: '/personal/userInfo' //默认重定向到首页
};
