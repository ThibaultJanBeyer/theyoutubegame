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
        <h2>Players</h2>
        <div class="js-config-players-container">
          <div class="js-config-players-el">
            <input
              class="js-config-player-name"
              type="text"
              value="Player ${this.playerIndex}">
            <input
              class="js-config-player-color"
              type="color"
              value="#0000ff">
          </div>
        </div>
        <button 
          type="button"
          class="js-config-player-add"
          title="add">
          +
        </button>

        <h2>YouTube Settings</h2>
        <label>
          <input class="js-config-yt-title"
            type="checkbox">
          Show video titles
        </label>
        <label>
          <input class="js-config-yt-controls"
            type="checkbox">
          Enable youtube controls
        </label>
      `,
      onAccept: this.onAccept.bind(this)
    });

    this.setupDialog();

    return this.dialog;
  }

  setupDialog() {
    this.setupPlayers();
  }

  setupPlayers() {
    this.dialog.nodes.add = this.dialog.nodes.base
      .querySelector('.js-config-player-add');
    
    this.dialog.nodes.container = this.dialog.nodes.base
      .querySelector('.js-config-players-container');

    this.dialog.nodes.add
      .addEventListener('click', () => {
        this.playerIndex++;

        this.dialog.nodes.container.innerHTML += `
          <div class="js-config-players-el">
            <input class="js-config-player-name"
              type="text"
              value="Player ${this.playerIndex}">
            <input type="color"
              class="js-config-player-color"
              value="#${Math.floor(Math.random()*16777215).toString(16)}">
            <button 
              type="button"
              class="js-config-player-remove"
              title="remove">
              -
            </button>
          </div>
        `;

        this.dialog.nodes.removes = this.dialog.nodes.container
          .querySelectorAll('.js-config-player-remove');
      
        this.dialog.nodes.removes.forEach(rem => {
          rem.addEventListener('click', () => {
            this.playerIndex--;
            this.dialog.nodes.container.removeChild(
              rem.closest('.js-config-players-el')
            );
          })
        })
      });
  }

  async showDialog() {
    const dlg = this.createDialog();
    dlg.show();
    gameStore.location = await youTubeHandler.userRegion;
  }

  parseYTSettings() {
    gameStore.ytTitle = this.dialog.nodes.base
      .querySelector('.js-config-yt-title').checked;

    gameStore.ytControls = this.dialog.nodes.base
      .querySelector('.js-config-yt-controls').checked;
  }

  parsePlayers() {
    playerStore.players = [];

    this.playerEls = this.dialog.nodes.container
      .querySelectorAll('.js-config-players-el');
    this.playerEls.forEach(playerEl => {
      playerStore.addPlayer({
        name: playerEl.querySelector('.js-config-player-name').value,
        color: playerEl.querySelector('.js-config-player-color').value
      })
    })

  }

  onAccept() {
    this.parsePlayers();
    this.parseYTSettings();
    topic.publish('game/start')
  }
}

const configurationDialog = new ConfigurationDialog();
