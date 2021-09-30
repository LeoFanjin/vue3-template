/**
 * 获得IE浏览器版本
 */
const getAgent = () => {
  let version = null;

  if (
    navigator.userAgent.indexOf('MSIE') >= 0 &&
    navigator.userAgent.indexOf('Opera') < 0
  ) {
    let ua = navigator.userAgent;
    let s = 'MSIE';
    let i = ua.indexOf(s);
    version = parseFloat(ua.substr(i + s.length));
  }
  return version;
};

function myBrowser() {
  var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf('Opera') > -1;
  // 判断是否Opera浏览器
  if (isOpera) {
    return 'Opera';
  }
  // 判断是否Firefox浏览器
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF';
  }
  // 判断是否Chrome浏览器
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome';
  }
  // 判断是否Safari浏览器
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari';
  }
  // 判断是否IE浏览器
  if (
    userAgent.indexOf('compatible') > -1 &&
    userAgent.indexOf('MSIE') > -1 &&
    !isOpera
  ) {
    return 'IE';
  }
}

export { getAgent, myBrowser };
