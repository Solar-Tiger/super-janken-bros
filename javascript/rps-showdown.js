/* eslint-disable prefer-arrow-callback */
/* eslint-disable radix */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */

const rpsShowdownPage = document.querySelector('.rps-showdown');

// ---------------------------------------------------------------------------
//            RUN SPECIFIC FUNCTION BASED ON WHAT PAGE IS LOADED
// ---------------------------------------------------------------------------

const bodyName = document.body.className;

switch (bodyName) {
  case 'rps-options':
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

// ---------------------------------------------------------------------------
//                             RPS OPTIONS PAGE
// ---------------------------------------------------------------------------

// WHEN PAGE LOADS, SETUP DEFAULT SELECTIONS AND HAVE BUTTONS TO CONTROL WHICH RPS GAME MODE IS SELECTED

function rpsGameMode() {
  let amountOfRounds = document.querySelector('.current-round-number');
  let selectedRpsGameMode = document.querySelector('.rps-game-mode-choice');
  const rpsGameModeButton = document.querySelectorAll('.rps-game-mode-btn');
  let currentGameMode = localStorage.getItem('currentGameMode');
  let outOfAmountOfRoundsTwo;

  // CONTROLS WHAT RPS GAME MODE IS SELECTED
  rpsGameModeButton.forEach((button) => {
    button.addEventListener('click', switchRpsGameMode);
  });

  // DEFAULT INSTRUCTIONS FOR WHEN PAGE LOADS

  // if null
  if (currentGameMode === null) {
    amountOfRounds.textContent = 5;
    localStorage.setItem('amountOfRounds', amountOfRounds.textContent);

    let outOfAmountOfRonuds = 3;
    localStorage.setItem('outOfAmountOfRounds', outOfAmountOfRonuds);

    outOfAmountOfRoundsTwo = 2;
    localStorage.setItem('outOfAmountOfRoundsTwo', outOfAmountOfRoundsTwo);

    selectedRpsGameMode.textContent = 'First to selected number';
    localStorage.setItem('currentGameMode', selectedRpsGameMode.textContent);

    rpsFirstToOptions();
  }

  // if First to selected number
  else if (currentGameMode === 'First to selected number') {
    amountOfRounds.textContent = localStorage.getItem('amountOfRounds');
    selectedRpsGameMode.textContent = currentGameMode;
    rpsFirstToOptions();
  }

  // if Best out of X
  else if (currentGameMode === 'Best out of X') {
    amountOfRounds.textContent = localStorage.getItem('outOfAmountOfRounds');
    selectedRpsGameMode.textContent = currentGameMode;
    rpsBestOutOfOptions();
  }
}

// FUNCTION FOR CHANGING RPS GAME MODES

function switchRpsGameMode() {
  let amountOfRounds = document.querySelector('.current-round-number');
  let selectedRpsGameMode = document.querySelector('.rps-game-mode-choice');

  switch (localStorage.getItem('currentGameMode')) {
    case 'First to selected number':
      selectedRpsGameMode.textContent = 'Best out of X';
      localStorage.setItem('currentGameMode', selectedRpsGameMode.textContent);
      amountOfRounds.textContent = localStorage.getItem('outOfAmountOfRounds');
      rpsBestOutOfOptions();
      break;
    case 'Best out of X':
      selectedRpsGameMode.textContent = 'First to selected number';
      localStorage.setItem('currentGameMode', selectedRpsGameMode.textContent);
      amountOfRounds.textContent = localStorage.getItem('amountOfRounds');
      rpsFirstToOptions();
      break;
    default:
      console.log("It's broken");
  }
}

// FUNCTION FOR FIRST TO SELECTED NUMBER RPS GAME MODE

function rpsFirstToOptions() {
  const lowerRoundNumber = document.querySelector('.lower-round-number');
  const higherRoundNumber = document.querySelector('.higher-round-number');

  lowerRoundNumber.addEventListener('click', lowerRoundNumberFunc);
  higherRoundNumber.addEventListener('click', higherRoundNumberFunc);

  if (localStorage.getItem('currentGameMode') === 'First to selected number') {
    lowerRoundNumber.removeEventListener('click', bestOutOfNumberLower);
    higherRoundNumber.removeEventListener('click', bestOutOfNumberHigher);
  }
}

function lowerRoundNumberFunc() {
  let currentRoundNumber = parseInt(localStorage.getItem('amountOfRounds'));
  let amountOfRounds = document.querySelector('.current-round-number');

  if (parseInt(localStorage.getItem('amountOfRounds')) > 3) {
    currentRoundNumber -= 1;
    amountOfRounds.textContent = currentRoundNumber;
    localStorage.setItem('amountOfRounds', currentRoundNumber);
  }
}

function higherRoundNumberFunc() {
  let currentRoundNumber = parseInt(localStorage.getItem('amountOfRounds'));
  let amountOfRounds = document.querySelector('.current-round-number');

  if (parseInt(localStorage.getItem('amountOfRounds')) < 9) {
    currentRoundNumber += 1;
    amountOfRounds.textContent = currentRoundNumber;
    localStorage.setItem('amountOfRounds', currentRoundNumber);
  }
}

// FUNCTION FOR BEST OUT OF X RPS GAME MODE

function rpsBestOutOfOptions() {
  const lowerRoundNumber = document.querySelector('.lower-round-number');
  const higherRoundNumber = document.querySelector('.higher-round-number');

  lowerRoundNumber.addEventListener('click', bestOutOfNumberLower);
  higherRoundNumber.addEventListener('click', bestOutOfNumberHigher);

  if (localStorage.getItem('currentGameMode') === 'Best out of X') {
    lowerRoundNumber.removeEventListener('click', lowerRoundNumberFunc);
    higherRoundNumber.removeEventListener('click', higherRoundNumberFunc);
  }
}

function bestOutOfNumberLower() {
  let currentAmountOfRounds = parseInt(
    localStorage.getItem('outOfAmountOfRounds')
  );
  let currentAmountOfRoundsTwo = parseInt(
    localStorage.getItem('outOfAmountOfRoundsTwo')
  );
  let amountOfRounds = document.querySelector('.current-round-number');

  if (parseInt(localStorage.getItem('outOfAmountOfRounds')) > 3) {
    currentAmountOfRounds -= 2;
    currentAmountOfRoundsTwo -= 1;
    amountOfRounds.textContent = currentAmountOfRounds;
    localStorage.setItem('outOfAmountOfRounds', currentAmountOfRounds);
    localStorage.setItem('outOfAmountOfRoundsTwo', currentAmountOfRoundsTwo);
  }
}

function bestOutOfNumberHigher() {
  let currentAmountOfRounds = parseInt(
    localStorage.getItem('outOfAmountOfRounds')
  );
  let currentAmountOfRoundsTwo = parseInt(
    localStorage.getItem('outOfAmountOfRoundsTwo')
  );
  let amountOfRounds = document.querySelector('.current-round-number');

  if (parseInt(localStorage.getItem('outOfAmountOfRounds')) < 9) {
    currentAmountOfRounds += 2;
    currentAmountOfRoundsTwo += 1;
    amountOfRounds.textContent = currentAmountOfRounds;
    localStorage.setItem('outOfAmountOfRounds', currentAmountOfRounds);
    localStorage.setItem('outOfAmountOfRoundsTwo', currentAmountOfRoundsTwo);
  }
}

// ---------------------------------------------------------------------------
//            GET CHARACTER CHOICE AND UPDATE CHARACTER PREVIEW
// ---------------------------------------------------------------------------

// GET CHARACTER CHOICE

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

// UPDATE CHARACTER PREVIEW

function updatePickedCharacter() {
  const characterPicked = document.querySelector('.character-picked');

  const pickedCharacter = localStorage.getItem('characterportrait');

  characterPicked.src = `${pickedCharacter}`;

  return characterPicked;
}

// ---------------------------------------------------------------------------
//                GET STAGE CHOICE AND UPDATE STAGE PREVIEW
// ---------------------------------------------------------------------------

// GET STAGE CHOICE

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

// UPDATE STAGE PREVIEW

function updateStagePicked() {
  const stagePicked = document.querySelector('.stage-picked');

  const pickedStage = localStorage.getItem('stagename');

  stagePicked.src = `${pickedStage}`;

  return stagePicked;
}

// ---------------------------------------------------------------------------
//                              RPS GAME LOGIC
// ---------------------------------------------------------------------------

function rpsShowdown() {
  const playerChoices = document.querySelector('.player-choices');
  let playerScore = document.querySelector('.player-score');
  let computerScore = document.querySelector('.computer-score');
  let rpsUpdates = document.querySelector('.choices-made');
  const resetButton = document.querySelector('.reset-button');
  let rpsChampionGameMode = localStorage.getItem('currentGameMode');

  localStorage.removeItem('noChoice');
  localStorage.setItem('noChoice', 0);
  localStorage.removeItem('playerChoice');

  // IF RPS CHAMPION GAME MODE IS NULL
  if (rpsChampionGameMode === null) {
    let currentScore = 5;
    localStorage.setItem('amountOfRounds', currentScore);

    let outOfAmountOfRonuds = 3;
    localStorage.setItem('outOfAmountOfRounds', outOfAmountOfRonuds);

    let outOfAmountOfRoundsTwo = 2;
    localStorage.setItem('outOfAmountOfRoundsTwo', outOfAmountOfRoundsTwo);

    let rpsCurrentGameMode = 'First to selected number';
    localStorage.setItem('currentGameMode', rpsCurrentGameMode);
  }

  // ASIGN BOTH PLAYER AND COMPUTER A SCORE OF 0
  let playerUpdatedScore = 0;
  let computerUpdatedScore = 0;

  playerChoices.addEventListener('click', gameTime);

  function gameTime(e) {
    let playersChoice = e.target.classList[1];

    localStorage.setItem('playerChoice', playersChoice);

    let roundVictor = decideRoundVictor(
      playersChoice,
      computersChoice(playersChoice)
    );

    updateRPSScore(roundVictor);

    rpsChampion();
  }

  // GET COMUTER CHOICE OF ROCK, PAPER OR SCISSORS AND RETURN RESULT

  function computersChoice(pChoice) {
    if (
      (pChoice === 'rock' || pChoice === 'paper' || pChoice === 'scissors') &&
      localStorage.getItem('noChoice') === '0'
    ) {
      const computerChoices = ['rock', 'paper', 'scissors'];

      let computerChoice = Math.floor(Math.random() * computerChoices.length);

      localStorage.setItem('noChoice', 1);

      return computerChoices[computerChoice];
    }

    if (pChoice === 'rock') {
      const computerChoices = [
        'rock',
        'paper',
        'rock',
        'paper',
        'rock',
        'paper',
        'rock',
        'paper',
        'rock',
        'scissors',
      ];

      let computerChoice = Math.floor(Math.random() * computerChoices.length);

      if (computerChoices[computerChoice] === 'scissors') {
        localStorage.setItem('noChoice', 0);
      }

      return computerChoices[computerChoice];
    }

    if (pChoice === 'paper') {
      const computerChoices = [
        'paper',
        'scissors',
        'paper',
        'scissors',
        'paper',
        'scissors',
        'paper',
        'scissors',
        'paper',
        'rock',
      ];

      let computerChoice = Math.floor(Math.random() * computerChoices.length);

      if (computerChoices[computerChoice] === 'rock') {
        localStorage.setItem('noChoice', 0);
      }

      return computerChoices[computerChoice];
    }

    if (pChoice === 'scissors') {
      const computerChoices = [
        'rock',
        'scissors',
        'rock',
        'scissors',
        'rock',
        'scissors',
        'rock',
        'scissors',
        'rock',
        'paper',
      ];

      let computerChoice = Math.floor(Math.random() * computerChoices.length);

      if (computerChoices[computerChoice] === 'paper') {
        localStorage.setItem('noChoice', 0);
      }

      return computerChoices[computerChoice];
    }
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
    let rpsChampionGameMode = localStorage.getItem('currentGameMode');

    // IF RPS CHAMPION GAME MODE IS FIRST TO SELECTED NUMBER
    if (rpsChampionGameMode === 'First to selected number') {
      let firstToNumberScore = localStorage.getItem('amountOfRounds');

      if (playerUpdatedScore === parseInt(firstToNumberScore)) {
        rpsUpdates.textContent = 'Player is the champion!';

        playerChoices.removeEventListener('click', gameTime);
      }

      // code
      if (computerUpdatedScore === parseInt(firstToNumberScore)) {
        rpsUpdates.textContent = 'Computer is the champion!';

        playerChoices.removeEventListener('click', gameTime);
      }
    }

    // IF RPS CHAMPION GAME MODE IS BEST OUT OF X
    else if (rpsChampionGameMode === 'Best out of X') {
      let bestOutOfNumberScoreOne = parseInt(
        localStorage.getItem('outOfAmountOfRounds')
      );
      let bestOutOfNumberScoreTwo = parseInt(
        localStorage.getItem('outOfAmountOfRoundsTwo')
      );
      let finalBestOutOfScore =
        (bestOutOfNumberScoreOne % bestOutOfNumberScoreTwo) + 1;

      if (playerUpdatedScore === parseInt(finalBestOutOfScore)) {
        rpsUpdates.textContent = 'Player is the champion!';

        playerChoices.removeEventListener('click', gameTime);
      }

      // code
      if (computerUpdatedScore === parseInt(finalBestOutOfScore)) {
        rpsUpdates.textContent = 'Computer is the champion!';

        playerChoices.removeEventListener('click', gameTime);
      }
    }
  }

  // RESET THE GAME TO TRY AGAIN

  resetButton.addEventListener('click', () => {
    playerUpdatedScore = 0;
    playerScore.textContent = 0;

    computerUpdatedScore = 0;
    computerScore.textContent = 0;

    localStorage.setItem('noChoice', 0);

    rpsUpdates.textContent = 'Click buttons to begin!';

    playerChoices.addEventListener('click', gameTime);
  });
}

// FUNCTION THAT RETRIEVES CHARACTER AND STAGE SELECTIONS

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
