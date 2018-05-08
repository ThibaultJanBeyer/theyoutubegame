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
    this.addEventListeners();
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
              class="input"
              type="color"
              value="${player.color}">
            ${player.name}
          </td>
          <td class="score">
            ${(player.score*1).toLocaleString()}
          </td>
          <td class="guess ${gameStore.hideGuesses ? 'hide-guesses' : ''}">

            <input
              class="input input--guess"
              id="guess-${i}"
              onFocus="this.select();"
              type="number"
              pattern="[0-9]+"
              value="${player.guess || ''}"
              required>

            <span></span>

            ${gameStore.hideGuesses && gameStore.guessesButton ? `
              <button class="nobutton js-show-pw">
                <i class="fas fa-eye"></i>
              </button>
            ` : ''}

          </td>
        </tr>
      `;
    });
  }

  addEventListeners() {
    playerStore.players.forEach(player => {
      this.n.players.querySelector(`tr[data-id="${player.id}"] .guess input`)
        .addEventListener('change', e => {
          player.guess = e.target.value;
        });
    });

    this.n.guessInputs = this.n.players.querySelectorAll('.guess input');
    this.n.guessInputs.forEach(guessInput => 
      guessInput.addEventListener('keydown', ev => help.keyNextHandler(ev))
    );

    this.n.players.querySelectorAll('.js-show-pw')
      .forEach(shower => shower
        .addEventListener('click', ev => {
          shower.parentNode.classList.toggle('hide-guesses');
          help.showHidePW(shower);
        })
      );
  }

}

const scoreboard = new Scoreboard();
