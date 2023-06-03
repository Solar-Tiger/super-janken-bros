/* eslint-disable prefer-const */

let stageBackground = document.querySelectorAll('.stage-portrait');

stageBackground.forEach((stage) => {
  stage.addEventListener('click', () => {
    localStorage.setItem('stagename', stage.src);
  });
});
