/**
 * 例：v-login="{'cls':'el-input__inner','type':'password','self': 'true', 'color': '#97a8be'}"
 * cls   饿了么input样式:el-input__inner
 * type  text/password
 * self  饿了么input:true
 * color 默认颜色
 *
 * @type {{inserted: login.inserted}}
 */
const login = {
  inserted: function (el, binging) {
    if (
      navigator.appName == 'Microsoft Internet Explorer' &&
      navigator.appVersion.split(';')[1].replace(/[ ]/g, '') == 'MSIE9.0'
    ) {
      let value = binging.value;
      el = value.self == 'false' ? el : el.children[0];
      let txt = el.getAttribute('placeholder');
      el.style.color += ' ' + value.color + '';
      el.value = txt;
      if (el.getAttribute('type') == 'password') {
        el.setAttribute('type', 'text');
      }
      el.onfocus = function () {
        el.className = value.cls;
        if (el.value == txt) {
          if (value.type == 'password') {
            el.setAttribute('type', 'password');
          }
          el.value = '';
        }
      };
      el.onblur = function () {
        if (el.value.trim() == '') {
          if (el.getAttribute('type') == 'password') {
            el.setAttribute('type', 'text');
          }
          el.style.color += ' ' + value.color + '';
          el.value = txt;
        }
      };
    }
  }
};

export { login };
