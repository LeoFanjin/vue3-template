// import langCommon from 'base/lang/{{G.LANG}}/common.json';

let containerDOM = $('<div class="app-alerts"></div>').appendTo(
  document.body
)[0];
let toRef = null;

let Alerts = {
  /**
   * @param {String} content
   * @param {Number} timeout ms delay to hide
   * @param {String} type success|info|warning|danger
   */
  show(content, timeout = 5000, type = 'info') {
    clearTimeout(toRef);
    this.hide();
    let tpl = `<div class="alert alert-${type} alert-dismissible">
      <!--<button type="button" class="close" onclick="hide();"><span>&times;</span></button>-->
      ${content}
    </div>`;
    let dom = $(tpl).appendTo(containerDOM);
    dom[0].offsetTop;
    dom.addClass('show');
    toRef = setTimeout(this.hide, timeout);
  },

  hide() {
    let alerts = $('.alert', containerDOM);
    alerts.removeClass('show');
    setTimeout(() => {
      alerts.remove();
    }, 300);
  }
};

for (let type of ['success', 'info', 'warning', 'danger']) {
  Alerts[type] = (content, timeout) => Alerts.show(content, timeout, type);
}

Alerts.suc = Alerts.success;
Alerts.warn = Alerts.warning;

Alerts.error = Alerts.err = (content, timeout) => {
  if (typeof content === 'object' && content) {
    if (content.responseText) {
      content = JSON.parse(content.responseText).message;
      if (content) {
        return Alerts.danger(content);
      }
    }
    content =
      content &&
      (content.status === 200 ||
        content.responseText ||
        content.statusText ||
        content.message);
  }
  Alerts.danger(content, timeout);
};

Alerts.dev = (content, timeout) => {
  Alerts.warn(`*** ${content} ***`, timeout);
};

export { Alerts };
