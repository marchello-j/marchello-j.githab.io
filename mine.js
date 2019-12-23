
// menu acco

$(function() {

  var btn = $('.menu-acco__name');
  var activeClass = 'menu-acco__item--active';

  btn.click(function(event) {
    event.preventDefault();
    var parent = $(this).parent();

      if (parent.hasClass(activeClass)) {
        parent.removeClass(activeClass);
      }

      else {
        btn.parent().removeClass(activeClass);
        parent.addClass(activeClass);
      }

  });
});

// team acco

$(function () {

  var baton = $('.team-acco__name');
  var activeClass = 'team-acco__container--active';

  baton.click(function (event) {
    event.preventDefault();
    var parent = $(this).parent();

    if (parent.hasClass(activeClass)) {
      parent.removeClass(activeClass);
    }
    else {
      baton.parent().removeClass(activeClass);
      parent.addClass(activeClass);
    }

  });
});