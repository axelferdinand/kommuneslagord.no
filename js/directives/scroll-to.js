// Scroll to
"use strict";
app.directive('scrollTo', function(scroller, $timeout, $window, $location) {

  return {
    link: function(scope, element, attrs) {
      // Bind click
      angular.element(element).bind('click', function(event) {
        event.preventDefault();

        if (attrs.scrollTo != 'top') {
          var scrollToObj = document.querySelector(attrs.href);

          $timeout(function(){
            scrollToObj.focus();
          }, 400);

          $timeout(function(){
            scroller.scrollTo(document.body, objectTop(scrollToObj), 300);
          }, 100);
        } else {
          $timeout(function(){
            scroller.scrollTo(document.body, 0, 300);
          }, 100);
        }
      });
    }
  };
});
