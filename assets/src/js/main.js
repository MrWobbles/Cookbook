jQuery(document).ready(function ($) {
  $.getJSON('~/recipes.json', function(recipes){
    $('.recipes').html(recipes);
  });
});