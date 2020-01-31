const loadHistory = () => {
  const storageLength = localStorage.length;
  const lsPlayer = document.querySelector('.lsPlayer');
  const lsScore = document.querySelector('.lsScore');
  let player, score;
  const scoresTable = [];
  for (let i = 0; i < storageLength; i++) {
    let key = localStorage.key(i);
    let result = JSON.parse(localStorage.getItem(key));
    player = result.player;
    score = result.score;
    scoresTable.push({
      player: player,
      score: score
    });
  }
  scoresTable.sort((a, b) => a.score - b.score);
  scoresTable.reverse();
  for (let i = 0; i < storageLength; i++) {
    lsPlayer.innerHTML += `<p>${scoresTable[i].player}</p>`;
    lsScore.innerHTML += `<p>${scoresTable[i].score}</p>`;
  }
}

document.querySelector('.btn-clear').addEventListener('click', () => {
  localStorage.clear();
});

loadHistory();