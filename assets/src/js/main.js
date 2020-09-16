jQuery(document).ready(function ($) {
  $.getJSON('~/recipes.json', function(recipes){
    console.log(recipes);
  });
});