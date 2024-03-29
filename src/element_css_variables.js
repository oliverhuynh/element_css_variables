(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.element_css_variables = {
    attach: function attach(context) {
      const refresh = Drupal.debounce(() => {
        const ecs = drupalSettings.element_css_variables || [];
        for (const ec of ecs) {
          const elements = ec.elements || [ec];
          const eid = ec.id || false;
          for (const elm of $(elements.join(', ')).filter(':visible').toArray()) {
            const id = eid || $(elm).attr('id');
            if (!id) {
              continue ;
            }
            let item;
            item = document.documentElement;
            if (eid) {
              item = elm;
            }
            item.style.setProperty(`--${id}-height`, $(elm).outerHeight() + 'px');
          }
        }
      }, 250);
      $(window).once('ecs').resize(refresh);
      refresh();
    }
  };
})(jQuery, Drupal, drupalSettings);
