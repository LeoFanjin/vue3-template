/**
 * button
 */
var button = {
  inserted: function(el) {
    try {
      jQuery(el).rippleria();
    } catch (e) {
      console.log(e);
    }
  }
};

export { button };
