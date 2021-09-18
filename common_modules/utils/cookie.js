var getCookie = function(name) {
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  arr = document.cookie.match(reg);

  if (arr) {
    return unescape(arr[2]);
  } else {
    return null;
  }
};

export const cookie = {
  getCookie: getCookie,
  removeCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cVal = getCookie(name);
    if (cVal !== null) {
      document.cookie = name + '=' + cVal + ';expires=' + exp.toGMTString();
    }
  },
  setCookie(name, value) {
    document.cookie = name + '=' + escape(value);
  }
};
