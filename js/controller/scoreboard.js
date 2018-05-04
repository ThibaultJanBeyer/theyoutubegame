class Scoreboard {
  constructor() {
    this.n = {};
    this.setup();
    this.firstTime = false;
  }

  setup() {
    this.n.scoreboard = document.querySelector('.js-game-scoreboard');
    topic.subscribe('game/start', () => this.draw());
    topic.subscribe('playerStore/player/score/update', () => this.drawPlayers());
  }

  draw() {
    this.drawScoreboard();
    this.drawPlayers();
  }

  drawScoreboard() {
    this.n.scoreboard.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Points</th>
            <th>Guess</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
      <div class="scoreboard__guess-info">
        <p>How many views do you think this video has?</p>
        <p>
          <label for="guess-0">
            <strong>Enter your guesses!</strong>
          </label>
        </p>
      </div>
    `;

    this.n.players = this.n.scoreboard.querySelector('tbody');
    setTimeout(() => {
      const info = document.querySelector('.scoreboard__guess-info');
      info.style.opacity = 0;
      setTimeout(() => {
        info.parentNode.removeChild(info);
      }, 1000);
    }, 10000);
  }

  drawPlayers() {
    this.n.players.innerHTML = '';
    playerStore.players.forEach((player, i) => {
      this.n.players.innerHTML += `
        <tr data-id="${player.id}">
          <td class="name">
            <input disabled
              type="color"
              value="${player.color}">
            ${player.name}
          </td>
          <td class="score">
            ${(player.score*1).toLocaleString()}
          </td>
          <td class="guess">
            <input
              id="guess-${i}"
              onFocus="this.select();"
              type="number"
              value="${player.guess}">
          </td>
        </tr>
      `;
    });

    playerStore.players.forEach(player => {
      this.n.players.querySelector(`tr[data-id="${player.id}"] .guess input`)
        .addEventListener('change', e => {
          player.guess = e.target.value;
        });
    });

    this.n.players.querySelectorAll('.guess input')
      .forEach(guessInput => guessInput
        .addEventListener('keydown', ev => help.keyNextHandler(ev))
      );
  }

}

const scoreboard = new Scoreboard();
