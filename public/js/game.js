/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a '1' or 2 '6' in a row, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100( or earlier set amount) points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, winningScore, pastTwoRolls;
const playerOneName = document.querySelector('#name-0').textContent;
const playerTwoName = document.querySelector('#name-1').textContent;


init();

document.querySelector('.btn-new').addEventListener('click', () => {
  winningScore = document.querySelector('#score-input').value;
  if (winningScore == 0) {
    winningScore = 100;
  }
  init();
});

function nextPlayer() {
  //Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.querySelector('#current-0').textContent = '0';
  document.querySelector('#current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
  pastTwoRolls = 0;
}

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = '/public/img/dice-' + dice + '.png';

    //3. update the round score IF the rolled number was NOT a 1
    if (dice === 6) {
      pastTwoRolls += dice;
      //4. Rule about 2 '6' rolled in a row
      if (pastTwoRolls === 12) {
        document.querySelector('#score-' + activePlayer).textContent = 0;
        nextPlayer();
      }
    } else {
      pastTwoRolls = 0;
    }

    if (dice !== 1) {
      //Add score
      roundScore += dice;
      document.querySelector(
        '#current-' + activePlayer
      ).textContent = roundScore;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    //Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];

    //Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      // Player won
      // SAVING WINNER IN LOCAL STORAGE
      lsSave(activePlayer);

      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');
      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  winningScore = document.querySelector('#score-input').value;
  if (winningScore == 0) {
    winningScore = 100;
  }
  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('#name-0').textContent = playerOneName;
  document.querySelector('#name-1').textContent = playerTwoName;
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
}

// SAVING WINNER FUNCTION
function lsSave(player) {
  let winner = document.querySelector('#name-' + player).textContent;
  let winnerScore = document.querySelector('#score-' + player).textContent;
  let id = 'id ' + localStorage.length;
  let obj = {
    player: winner,
    score: winnerScore
  };
  let result = JSON.stringify(obj);
  localStorage.setItem(`${id}`, result);
}
