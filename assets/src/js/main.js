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
