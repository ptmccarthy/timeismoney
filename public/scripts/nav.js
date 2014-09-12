'use strict';

$(document).ready(function() {

  $('.navbar-nav a').click(function(e) {
    e.preventDefault();
    $('.content').hide();
    $('.navbar-nav').children('li').attr('class', 'inactive');
    $($(this)).parent().attr('class', 'active');
    $($(this).attr('href')).show();
  });

});