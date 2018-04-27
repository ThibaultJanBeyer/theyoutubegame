class PlayerStore extends BaseStore {
  constructor() {
    super();
    this.storeName = 'playerStore';

    this._players = [];
  }

  get players() { return this._players; }
  set players(value) { this.update('players', value) }

  addPlayer(player) { 
    const prev = this._players;
    this._players.push(new Player(player));
    this.publishChange('players', this._players, prev);
  }

  removePlayer(playerID) {
    const prev = this._players;
    this._players = this._players.filter(player => player.id !== playerID);
    this.publishChange('players', this._players, prev);
  }
}

const playerStore = new PlayerStore();
