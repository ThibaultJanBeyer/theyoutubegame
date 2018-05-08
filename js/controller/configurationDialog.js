class ConfigurationDialog {
  constructor() {
    this.playerIndex = 1;
    this.addEventListeners();
  }
  
  addEventListeners() {
    topic.subscribe('configuration/init', () => this.showDialog());
  }

  createDialog() {
    if(this.dialog) { return this.dialog; }

    this.dialog = new A11YDialog({
      type: 'alert',
      title: 'Game Setup',
      content: `
        <h2 class="fsm">
          Players
        </h2>
        <div class="js-config-players-container">
          <div class="js-config-players-el">
            <input
              class="input js-config-player-name"
              type="text"
              value="Player ${this.playerIndex}">
            <input
              class="input js-config-player-color"
              type="color"
              value="#0000ff">
          </div>
        </div>
        <button 
          type="button"
          class="nobutton js-config-player-add"
          title="add">
          <i class="fas fa-plus-square"></i>
        </button>

        <h2 class="fsm">
          Advanced Settings
        </h2>
        <div>
          <label>
            <input class="js-config-hide-guesses"
              type="checkbox" checked>
            Hide guesses from other players
          </label>
        </div>
        <div>
          <label>
            <input class="js-config-hide-guesses-button"
              type="checkbox" checked>
            Possible to show guesses
          </label>
        </div>
        <div>
          <label>
            <input class="js-config-yt-title"
              type="checkbox">
            Show video titles
          </label>
        </div>
        <div>
          <label>
            <input class="js-config-yt-controls"
              type="checkbox">
            Enable youtube controls
          </label>
        </div>
      `,
      onAccept: this.onAccept.bind(this)
    });

    this.postCreate();

    return this.dialog;
  }

  postCreate() {
    this.setupPlayers();
    this.dialog.nodes.base
      .querySelectorAll('input:not(.js-config-player-color)')
      .forEach(input => {
        input.addEventListener('keydown', e => help.keyNextHandler(e));
        input.addEventListener('focus', function(ev) { this.select(); });
      });
  }

  setupPlayers() {
    this.dialog.nodes.add = this.dialog.nodes.base
      .querySelector('.js-config-player-add');
    
    this.dialog.nodes.container = this.dialog.nodes.base
      .querySelector('.js-config-players-container');

    this.dialog.nodes.add
      .addEventListener('click', () => this.addPlayer());
  }

  addPlayer() {
    this.playerIndex++;

    const playerDiv = document.createElement('div');
    playerDiv.classList.add('js-config-players-el');

    playerDiv.innerHTML += `
      <input class="input js-config-player-name"
        type="text"
        value="Player ${this.playerIndex}">
      <input type="color"
        onFocus="this.select();"
        class="input js-config-player-color"
        value="#${Math.floor(Math.random()*16777215).toString(16)}">
      <button 
        type="button"
        class="nobutton js-config-player-remove"
        title="remove">
        <i class="fas fa-trash"></i>
      </button>
    `;

    playerDiv.querySelector('.js-config-player-name')
      .addEventListener('keydown', e => help.keyNextHandler(e));

    playerDiv.querySelector('.js-config-player-remove')
      .addEventListener('click', (e) => this.removePlayer(e.target));

    this.dialog.nodes.container.appendChild(playerDiv);
  }

  removePlayer(el) {
    this.playerIndex--;
    this.dialog.nodes.container.removeChild(
      el.closest('.js-config-players-el')
    );
  }

  async showDialog() {
    const dlg = this.createDialog();
    dlg.show();
    gameStore.location = await youTubeHandler.userRegion;
  }

  parseSpecialSettings() {
    gameStore.ytTitle = this.dialog.nodes.base
      .querySelector('.js-config-yt-title').checked;

    gameStore.ytControls = this.dialog.nodes.base
      .querySelector('.js-config-yt-controls').checked;

    gameStore.hideGuesses = this.dialog.nodes.base
      .querySelector('.js-config-hide-guesses').checked;

    gameStore.guessesButton = this.dialog.nodes.base
      .querySelector('.js-config-hide-guesses-button').checked;
  }

  parsePlayers() {
    playerStore.players = [];

    this.playerEls = this.dialog.nodes.container
      .querySelectorAll('.js-config-players-el');
    this.playerEls.forEach(playerEl => {
      playerStore.addPlayer({
        name: playerEl.querySelector('.js-config-player-name').value,
        color: playerEl.querySelector('.js-config-player-color').value
      });
    });

  }

  onAccept() {
    this.parsePlayers();
    this.parseSpecialSettings();
    topic.publish('game/start');
  }
}

const configurationDialog = new ConfigurationDialog();
