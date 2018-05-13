class GameStore extends BaseStore {
  constructor() {
    super();
    this.storeName = 'gameStore';

    this._location = null;
    this._channel  = null;
    this._language = 'EN';
  }

  get channel() { return this._channel; }
  set channel(value) { 
    history.pushState(null, null, `/g/${value}`);
    this.update('channel', value);
  }

  get location() { return this._location; }
  set location(value) { this.update('location', value); }

  get language() { return this._language; }
  set language(value) { this.update('language', value); }
}

const gameStore = new GameStore();
