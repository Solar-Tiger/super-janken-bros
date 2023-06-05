/* eslint-disable prefer-const */

let characterPortrait = document.querySelectorAll('.character-portrait');

characterPortrait.forEach((stage) => {
  stage.addEventListener('click', () => {
    localStorage.setItem('stagename', stage.src);
  });
});
