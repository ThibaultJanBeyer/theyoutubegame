class GameStore {
  constructor() {
    this._location = null;
    this._language = 'EN';
    this._players = [];
  }

  get location() { return this._location; }
  set location(value) {
    this._location = value;
    topic.publish('gameStore/property/location/update');
  }

  get players() { return this._players; }
  set players(value) {
    this._players = value;
    topic.publish('gameStore/property/players/update');
  }

  get language() { return this._language; }
  set language(value) {
    this._language = value;
    topic.publish('gameStore/property/language/update');
  }
}

const gameStore = new GameStore();
