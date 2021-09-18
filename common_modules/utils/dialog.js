module.exports = {
  clearDialog: function () {
    //解决bootstrap模态框路由切换，遮罩层不消失问题
    document.querySelector('.modal-backdrop.fade.in').length > 0 &&
      document.querySelector('.modal-backdrop.fade.in').remove();
    if (document.querySelector('.dialog-open').length > 0) {
      document.querySelector('.dialog-open').removeClass('modal-open');
      document.querySelector('body').css('padding-right', '0px');
    }
  }
};
