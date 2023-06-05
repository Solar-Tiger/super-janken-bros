/* eslint-disable prefer-const */

let characterPortrait = document.querySelectorAll('.character-portrait');

characterPortrait.forEach((character) => {
  character.addEventListener('click', () => {
    localStorage.setItem('characterportrait', character.src);
  });
});
