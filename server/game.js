class Game {
  constructor() {
    this.create = this.create.bind(this);
  }

  create(req, res) {
    const WebSocketServer = require('ws').Server;
    this.wss = new WebSocketServer( { port: 40510 } );

    this.wss.on('connection', ws => {

      this.ws = ws;
      this.ws.on('message', this.onMessage.bind(this));
      this.ws.on('error', this.onError.bind(this));
      this.ws.on('close', this.onClose.bind(this));
      setInterval(
        () => this.sendMessage(`${new Date()}`),
        1000
      );

    });

    res.json({ ok: true });
  }

  onMessage(message) {
    console.log('received: %s', message);
  }

  onClose() {
    console.log('ws closed');
    this.ws.closed = true;
  }

  onError() {
    console.log('error: %s', error);
  }

  sendMessage(message) {
    if(this.ws.closed) return;
    this.ws.send(message);
  }
}

module.exports = new Game();
