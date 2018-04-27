class GameStore extends BaseStore {
  constructor() {
    super();
    this.storeName = 'gameStore';

    this._location = null;
    this._language = 'EN';
  }

  get location() { return this._location; }
  set location(value) { this.update('location', value) }

  get language() { return this._language; }
  set language(value) { this.update('language', value) }
}

const gameStore = new GameStore();
