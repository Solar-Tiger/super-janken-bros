/* eslint-disable no-undef */
/* eslint-disable prefer-const */

const rpsShowdownPage = document.querySelector('.rps-showdown');

// RUN SPECIFIC FUNCTION BASED ON WHAT PAGE IS LOADED

const bodyName = document.body.className;

switch (bodyName) {
  case 'rps-first-to-options':
    rpsFirstToOptions();
    rpsGameMode();
    break;
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

// OPTIONS FOR VARIOUS FUNCTIONS FOR RPS

function rpsFirstToOptions() {
  let currentRoundNumber;
  let amountOfRounds = document.querySelector('.current-round-number');

  if (localStorage.getItem('amountOfRounds') === null) {
    currentRoundNumber = 5;
  } else {
    currentRoundNumber = localStorage.getItem('amountOfRounds');
    amountOfRounds.textContent = currentRoundNumber;
  }

  const lowerRoundNumber = document.querySelector('.lower-round-number');
  const higherRoundNumber = document.querySelector('.higher-round-number');

  lowerRoundNumber.addEventListener('click', () => {
    if (parseInt(currentRoundNumber) !== 3) {
      currentRoundNumber--;
      amountOfRounds.textContent = currentRoundNumber;
      localStorage.setItem('amountOfRounds', currentRoundNumber);
    }
  });

  higherRoundNumber.addEventListener('click', () => {
    if (parseInt(currentRoundNumber) !== 9) {
      currentRoundNumber++;
      amountOfRounds.textContent = currentRoundNumber;
      localStorage.setItem('amountOfRounds', currentRoundNumber);
    }
  });
}

function rpsBestOutOfOptions() {
  let outOfRoundsNumber;
  let amountOfRounds = document.querySelector('.current-round-number');

  if (localStorage.getItem('outOfAmountOfRounds') === null) {
    outOfRoundsNumber = 3;
  } else {
    outOfRoundsNumber = localStorage.getItem('outOfAmountOfRounds');
    amountOfRounds.textContent = outOfRoundsNumber;
  }

  const lowerRoundNumber = document.querySelector('.lower-round-number');
  const higherRoundNumber = document.querySelector('.higher-round-number');

  lowerRoundNumber.addEventListener('click', () => {
    if (parseInt(outOfRoundsNumber) !== 3) {
      outOfRoundsNumber -= 2;
      amountOfRounds.textContent = outOfRoundsNumber;
      localStorage.setItem('amountOfRounds', outOfRoundsNumber);
    }
  });

  higherRoundNumber.addEventListener('click', () => {
    if (parseInt(outOfRoundsNumber) !== 9) {
      outOfRoundsNumber += 2;
      amountOfRounds.textContent = outOfRoundsNumber;
      localStorage.setItem('amountOfRounds', outOfRoundsNumber);
    }
  });
}

function rpsGameMode() {
  let selectedRpsGameMode = document.querySelector('.rps-game-mode-choice');
  const rpsGameModeButton = document.querySelectorAll('.rps-game-mode-btn');

  if (localStorage.getItem('currentGameMode') === null) {
    selectedRpsGameMode.textContent = 'First to selected number';
  } else {
    selectedRpsGameMode.textContent = localStorage.getItem('currentGameMode');
  }

  rpsGameModeButton.forEach((button) => {
    button.addEventListener('click', () => {
      if (selectedRpsGameMode.textContent === 'First to selected number') {
        selectedRpsGameMode.textContent = 'Best out of X';
        localStorage.setItem(
          'currentGameMode',
          selectedRpsGameMode.textContent
        );
      } else {
        selectedRpsGameMode.textContent = 'First to selected number';
        localStorage.setItem(
          'currentGameMode',
          selectedRpsGameMode.textContent
        );
      }
    });
  });
}

// GET CHARACTER CHOICE AND UPDATE CHARACTER PREVIEW

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

// GET STAGE CHOICE AND UPDATE STAGE PREVIEW

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

// COMPLETE RPS GAME LOGIC TO PLAY 5 ROUNDS OF RPS

function rpsShowdown() {
  const playerChoices = document.querySelector('.player-choices');
  let playerScore = document.querySelector('.player-score');
  let computerScore = document.querySelector('.computer-score');
  let rpsUpdates = document.querySelector('.choices-made');
  const resetButton = document.querySelector('.reset-button');

  // ASIGN BOTH PLAYER AND COMPUTER A SCORE OF 0
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

  // GET COMUTER CHOICE OF ROCK, PAPER OR SCISSORS AND RETURN RESULT
  function computersChoice() {
    const computerChoices = ['rock', 'paper', 'scissors'];

    let computerChoice = Math.floor(Math.random() * computerChoices.length);

    return computerChoices[computerChoice];
  }

  // DECIDE IF YOU WIN, LOSE OR TIE AND RETURN THAT VALUE
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

  // KEEP TRACK OF SCORES BASED ON WHO WINS, LOSES OR TIES
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

  // ONCE A SCORE REACHES THE NUMBER IN LOCAL STORAGE, REMOVE EVENT LISTENER AND END THE GAME
  function rpsChampion() {
    let scoreToReach = localStorage.getItem('amountOfRounds');

    if (playerUpdatedScore === parseInt(scoreToReach)) {
      rpsUpdates.textContent = 'Player is the champion!';

      playerChoices.removeEventListener('click', gameTime);
    }

    // code
    if (computerUpdatedScore === parseInt(scoreToReach)) {
      rpsUpdates.textContent = 'Computer is the champion!';

      playerChoices.removeEventListener('click', gameTime);
    }
  }

  // RESET THE GAME TO TRY AGAIN

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
