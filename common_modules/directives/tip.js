/**
 * button
 */
var tip = {
  inserted: function(el, bind) {
    try {
      if (bind.expression) {
        // $(el).attr("title", bind.expression);
        $(el).attr('data-toggle', 'tooltip');
        $(el).tooltip({
          placement: 'auto top',
          title: bind.expression,
          trigger: 'click',
          delay: { show: 200, hide: 500 }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
};

export { tip };
