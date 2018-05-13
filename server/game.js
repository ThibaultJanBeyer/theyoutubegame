class Game {
  constructor() {
    this.channels = {};
  }

  /**
   * @param {String} route route-id
   * @param {Websocket} socket
   */
  add(route, socket) {
    console.log('add: %s', route);
    const channel = this.channels[route];
    if(!channel) {
      this.channels[route] = [];
      this.channels[route].push(socket);
      return;
    }
    channel.push(socket);
  }

  /**
   * @param {String} route 
   * @param {Websocket} socket 
   */
  remove(route, socket) {
    console.log('remove: %s', route);
    const channel = this.channels[route];
    if(!channel) return;

    const i = channel.indexOf(socket);
    channel.splice(i, 1);
    if(channel.length > 0) return;

    delete this.channels[route];
  }

  /**
   * @param {String} route 
   * @param {String} message 
   */
  send(route, message) {
    const channel = this.channels[route];
    if(!channel) return;
    channel.forEach(ws => ws.send(message));
  }

  /**
   * @param {String} route
   * @param {String} message 
   */
  receive(route, _message) {
    const message = JSON.parse(_message);
    console.log('received: %s', message);
  }

  error(route, error) {
    console.log('error: %s', error);
  }

  /**
   * @param {String} route 
   * @param {WebSocket} ws 
   */
  init(route, ws) {
    ws.on('message', m => this.receive(route, m));
    ws.on('close', m => this.remove(route, ws));
    ws.on('error', e => this.error(route, e));

    this.add(route, ws);
    // @TODO: remove later
    setInterval(() => {
      this.send(route, route);
    }, 10000);
  }

}

module.exports = new Game();
