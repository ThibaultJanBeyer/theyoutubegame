class Scoreboard {
  constructor() {
    this.n = {};
    this.setup();
  }

  setup() {
    this.n.scoreboard = document.querySelector('.js-game-scoreboard');
    topic.subscribe('game/start', () => this.draw());
    topic.subscribe('playerStore/player/update', (topic, args) => {
      this.refreshPlayer(args)
    });
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
    `;
    this.n.players = this.n.scoreboard.querySelector('tbody');
  }

  drawPlayers() {
    this.n.players.innerHTML = '';
    playerStore.players.forEach(player => {
      this.n.players.innerHTML += `
        <tr data-id="${player.id}">
          <td class="name">
            <input disabled
              type="color"
              value="${player.color}">
            ${player.name}
          </td>
          <td class="score">
            ${player.score}
          </td>
          <td class="guess">
            <input
              type="number"
              value="${player.guess}">
          </td>
        </tr>
      `;
    });

    playerStore.players.forEach(player => {
      this.n.players.querySelector(`tr[data-id="${player.id}"] .guess input`)
        .addEventListener('change', e => {
          player.guess = e.target.value
        });
    });
  }

  // @todo: rewrite this beast
  refreshPlayer(args) {
    if(args.property === 'score') {
      this.n.players.querySelector(`tr[data-id="${args.id}"] .${args.property}`)
        .innerHTML = args.value;
    } else if(args.property === 'guess') {
      this.n.players.querySelector(`tr[data-id="${args.id}"] .${args.property} input`)
        .value = args.value;
    }
  }

}

const scoreboard = new Scoreboard();
