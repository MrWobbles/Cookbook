function addIngredient(){
  "use strict";

  var ingCount = document.querySelectorAll(".ingredient-txt").length;
  ingCount = ingCount + 1;

  var newIngredient = '<label for="ingredient_' + ingCount + '">Step ' + ingCount + '</label><input type="text" name="ingredients[]" class="ingredient-txt"/>';
  document.querySelector('.ingredients-container').innerHTML += newIngredient;
}

function addInstruction(){
  "use strict";
  var instCount = document.querySelectorAll(".instruction-ta").length;
  instCount = instCount + 1;

  var newInstruction = '<label for="instruction_' + instCount + '">Step ' + instCount + '</label><textarea name="instructions[]" class="instruction-ta"></textarea>';
  document.querySelector('.instructions-container').innerHTML += newInstruction;
}

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

  addInstruction();
}

document.querySelector('.add-ingredient').onclick = function(){
  "use strict";

  addIngredient();
}

document.querySelector('form').onkeypress = function(e){
  "use strict";
  
  if(e.key !== "Enter"){
    return true;
  } else {
    e.preventDefault();
    return false;
  }
}

document.addEventListener('click',function(e){
  "use strict";

  if(e.key == "Enter"){
    if(e.target == 'input.ingredient-text'){
      addIngredient();
    } else if (e.target == 'input.instruction-ta'){
      addInstruction();
    }
  }
});