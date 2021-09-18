module.exports = {
  // index: resolve => require(['../index.vue'], resolve),
  login: require('./login/router'),
  _404: require('./404/router'),
  children: [
    //home
    require('./home/router'),
    //404
    require('./error/404/router')

    //release  版本信息
    // require("./release/router")，
    //personal  个人中心
    // require("./personal/router")
  ]
};
