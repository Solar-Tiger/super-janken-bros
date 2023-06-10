/* eslint-disable no-undef */
/* eslint-disable prefer-const */

const rpsShowdownPage = document.querySelector('.rps-showdown');

const bodyName = document.body.className;

switch (bodyName) {
  case 'rps-character-select':
    rpsCharacterChoice();
    break;
  case 'rps-stage-select':
    rpsStageChoice();
    break;
  case 'rps-showdown':
    retrieveResults();

    rpsShowdown();
    break;
  default:
    console.log('WRONG');
}

function rpsCharacterChoice() {
  let characterPicked = document.querySelector('.character-picked');
  let savedCharacterPick = localStorage.getItem('characterportrait');

  if (savedCharacterPick === null) {
    characterPicked.src = 'images/rps-characters/fairy.png';
  } else {
    characterPicked.src = localStorage.getItem('characterportrait');
  }

  let characterPortrait = document.querySelectorAll('.character-portrait');

  characterPortrait.forEach((character) => {
    character.addEventListener('click', () => {
      localStorage.setItem('characterportrait', character.src);

      updatePickedCharacter();
    });
  });
}

function updatePickedCharacter() {
  const characterPicked = document.querySelector('.character-picked');

  const pickedCharacter = localStorage.getItem('characterportrait');

  characterPicked.src = `${pickedCharacter}`;

  return characterPicked;
}

function rpsStageChoice() {
  let stagePicked = document.querySelector('.stage-picked');
  let savedStagePick = localStorage.getItem('stagename');

  if (savedStagePick === null) {
    stagePicked.src = 'images/rps-stages/final_destination.jpg';
  } else {
    stagePicked.src = localStorage.getItem('stagename');
  }

  let stageBackground = document.querySelectorAll('.stage-background');

  stageBackground.forEach((stage) => {
    stage.addEventListener('click', () => {
      localStorage.setItem('stagename', stage.src);

      updateStagePicked();
    });
  });
}

function updateStagePicked() {
  const stagePicked = document.querySelector('.stage-picked');

  const pickedStage = localStorage.getItem('stagename');

  stagePicked.src = `${pickedStage}`;

  return stagePicked;
}

function rpsShowdown() {
  // RPS GAME LOGIC

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
}

function retrieveResults() {
  // FETCHES RPS CHARACTER PORTRAIT FROM LOCAL STORAGE BASED ON WHAT WAS PICKED AT CHARACTER SELECT

  const playersPortrait = document.querySelector('.picked-player');
  let characterPortrait = localStorage.getItem('characterportrait');

  playersPortrait.src = `${characterPortrait}`;

  // FETCHES RPS SHOWDOWN BACKGROUND FROM LOCAL STORAGE BASED ON WHAT WAS PICKED AT STAGE SELECT

  let shodownBgImg = localStorage.getItem('stagename');

  rpsShowdownPage.style.backgroundImage = `url(${shodownBgImg})`;
  rpsShowdownPage.style.backgroundRepeat = 'no-repeat';
  rpsShowdownPage.style.backgroundSize = 'cover';
  rpsShowdownPage.style.backgroundPosition = 'center top';
}
