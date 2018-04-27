class Scoreboard {
  constructor() {
    this.n = {};
    this.setup();
  }

  setup() {
    this.n.scoreboard = document.querySelector('.js-game-scoreboard');
    topic.subscribe('game/start', () => this.draw());
    topic.subscribe('playerStore/player/update', () => this.drawPlayers());
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
  }

}

const scoreboard = new Scoreboard();
