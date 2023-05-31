/* eslint-disable no-undef */
/* eslint-disable prefer-const */

const playerChoices = document.querySelector('.player-choices');
let playerScore = document.querySelector('.player-score');
let computerScore = document.querySelector('.computer-score');
let rpsUpdates = document.querySelector('.choices-made');
const resetButton = document.querySelector('.reset-button');

// asign both player and computer a score of 0
let playerUpdatedScore = 0;
let computerUpdatedScore = 0;

playerChoices.addEventListener('click', gameTime);

function gameTime(e) {
  let rpsButton = e.target.classList[0];

  if (rpsButton !== 'rps-btn') {
    return;
  }

  let playersChoice = e.target.classList[1];

  let roundVictor = decideRoundVictor(playersChoice, computersChoice());

  updateRPSScore(roundVictor);

  rpsChampion();
}

// get computers choice randomly between rock, paper and scissors and return that value
function computersChoice() {
  const computerChoices = ['rock', 'paper', 'scissors'];

  let computerChoice = Math.floor(Math.random() * computerChoices.length);

  return computerChoices[computerChoice];
}

// decide what value to return based on the outcome of what the player and computer picked
function decideRoundVictor(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    rpsUpdates.textContent = "It's a tie";

    return "It's a tie";
  }

  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    rpsUpdates.textContent = `Player picked ${playerChoice.toUpperCase()} and Computer picked ${computerChoice.toUpperCase()}. Player wins this round`;

    return 'Player wins!';
  }
  rpsUpdates.textContent = `Computer picked ${computerChoice.toUpperCase()} and Player picked ${playerChoice.toUpperCase()}. Computer wins this round`;

  return 'Computer wins!';
}

// keep track of the score based on who won each round
function updateRPSScore(roundVictor) {
  if (roundVictor === 'Player wins!') {
    playerUpdatedScore += 1;

    playerScore.textContent = playerUpdatedScore;
  }

  // code
  else if (roundVictor === 'Computer wins!') {
    computerUpdatedScore += 1;

    computerScore.textContent = computerUpdatedScore;
  }
}

// once a score reaches 5, remove the event listener and end the game
function rpsChampion() {
  if (playerUpdatedScore === 5) {
    rpsUpdates.textContent = 'Player is the champion!';

    playerChoices.removeEventListener('click', gameTime);
  }

  // code
  if (computerUpdatedScore === 5) {
    rpsUpdates.textContent = 'Computer is the champion!';

    playerChoices.removeEventListener('click', gameTime);
  }
}

resetButton.addEventListener('click', () => {
  playerUpdatedScore = 0;
  playerScore.textContent = 0;

  computerUpdatedScore = 0;
  computerScore.textContent = 0;

  rpsUpdates.textContent = 'Click buttons to begin!';

  playerChoices.addEventListener('click', gameTime);
});

// let string = 'whoever';
// let arr = ['x', 'x', 'x', 'x', 'x', 'x', 'x'];
// let newArr = string.split('');
// let usedArr = [];
// let hang = 0;

// function compareLetter() {
//   if (hang !== 8) {
//     let letter = prompt('Enter letter');
//     let miss = 0;

//     for (let i = 0; i < usedArr.length; i++) {
//       if (usedArr[i] === letter) {
//         console.log('Already used, try again');
//         return;
//       }
//     }

//     for (let i = 0; i < arr.length; i++) {
//       if (newArr[i] === letter) {
//         arr.splice(i, 1, letter);
//       } else {
//         miss++;
//       }
//     }

//     if (miss === newArr.length) {
//       hang++;
//     }

//     usedArr.push(letter);

//     console.log(usedArr);
//     console.log(arr);
//     console.log(hang);
//   } else {
//     console.log('Game over');
//     return 'Game over';
//   }
// }
