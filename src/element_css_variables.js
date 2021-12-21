(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.element_css_variables = {
    attach: function attach(context) {
      const refresh = Drupal.debounce(() => {
        const elements = drupalSettings.element_css_variables || [];
        for (const elm of $(elements.join(', ')).filter('[id]:visible').toArray()) {
          const id = $(elm).attr('id');
          document.documentElement.style.setProperty(`--${id}-height`, $(elm).outerHeight() + 'px');
        }
      }, 250);
      $(window).once('ecs').resize(refresh);
      refresh();
    }
  };
})(jQuery, Drupal, drupalSettings);
