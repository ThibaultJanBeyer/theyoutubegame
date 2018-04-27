
class Player extends BaseEntity {
  constructor(conf) {
    super();
    this.storeName = 'playerStore';
    this.entityName = 'player';

    this._id = conf.id || help.uuidv4();
    this._name = conf.name || 'Player X';
    this._color = conf.color || '#0000ff';
    this._score = conf.score ? conf.score : 0;
    this._guess = conf.guess ? conf.guess : 0;
  }

  get id() { return this._id; }
  set id(value) { this.update('id', value); }

  get name() { return this._name; }
  set name(value) { this.update('name', value); }

  get color() { return this._color; }
  set color(value) { this.update('color', value); }
  
  get score() { return this._score; }
  set score(value) { this.update('score', value); }

  get guess() { return this._guess; }
  set guess(value) { this.update('guess', value); }
}
