
window.onscroll = function () {
  "use strict";
  if (document.querySelector('.ingredients') !== null) {
    if (document.getElementsByTagName('html')[0].scrollTop > 640) {
      document.querySelector('.ingredients').classList.add('fixed');
    } else {
      document.querySelector('.ingredients')[0].classList.remove('fixed');
    }
  }
}

document.querySelector('.add-instruction').onclick = function(){
  "use strict";
  var instCount = document.querySelectorAll(".instruction-ta").length;
  instCount = instCount + 1;

  var newInstruction = '<div class="form-field sm-full"><label for="instruction_' + instCount + '">Step ' + instCount + '</label><textarea id="instruction_' + instCount + '" name="instructions[]" class="instruction-ta"></textarea><span class="delete">DELETE</span></div>';
  newInstruction = new DOMParser().parseFromString(newInstruction, "text/html");
  document.querySelector('.instructions-container').append(newInstruction.body.firstChild);
}

document.querySelector('.add-ingredient').onclick = function(){
  "use strict";
  var ingCount = document.querySelectorAll(".ingredient-txt").length;
  ingCount = ingCount + 1;

  var newIngredient = '<div class="form-field sm-full"><label for="ingredient_' + ingCount + '">Ingredient ' + ingCount + '</label><input id="ingredient' + ingCount + '"  type="text" name="ingredients[]" class="ingredient-txt"/><span class="delete">DELETE</span></div>';
  newIngredient = new DOMParser().parseFromString(newIngredient, "text/html");
  document.querySelector('.ingredients-container').append(newIngredient.body.firstChild);
}


document.querySelector('.instructions-container').addEventListener('click', function(e) {
  // loop parent nodes from the target to the delegation node
  for (var target = e.target; target && target != this; target = target.parentNode) {
      if (target.matches('.delete')) {
          target.parentNode.remove();
          break;
      }
  }
}, false);

document.querySelector('.ingredients-container').addEventListener('click', function(e) {
  // loop parent nodes from the target to the delegation node
  for (var target = e.target; target && target != this; target = target.parentNode) {
      if (target.matches('.delete')) {
          target.parentNode.remove();
          break;
      }
  }
}, false);