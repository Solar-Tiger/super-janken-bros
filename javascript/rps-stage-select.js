/* eslint-disable prefer-const */

let stageBackground = document.querySelectorAll('.stage-background');

stageBackground.forEach((stage) => {
  stage.addEventListener('click', () => {
    localStorage.setItem('stagename', stage.src);
  });
});
