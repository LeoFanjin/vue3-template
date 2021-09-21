/**
 * button
 */
const button = {
  inserted: function(el) {
    try {
      jQuery(el).rippleria();
    } catch (e) {
      console.log(e);
    }
  }
};

export { button };
