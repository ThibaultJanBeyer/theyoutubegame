class WebSocketHandler {

  constructor() {
    this.interval = setInterval(() => {
      console.log('interval');
      if(location.pathname.indexOf('/g/') >= 0) {
        this.setup();
        clearInterval(this.interval);
      }
    }, 1000);
  }

  setup() {
    this.channel = location.pathname.split('/g/')[1];
    this.ws = new WebSocket(`ws://localhost:40510/?channel=${this.channel}`);
    this.ws.onopen = this.onOpen.bind(this);
    this.ws.onmessage = this.onMessage.bind(this);
  }

  // event emmited when connected
  onOpen() {
    console.log('websocket is connected ...');

    // sending a send event to websocket server
    this.ws.send(JSON.stringify({
      type: 'setup',
      channel: this.channel
    }));
  }

  // event emmited when receiving message 
  onMessage(ev) {
    console.log(ev.data);
  }

}

const webSocketHandler = new WebSocketHandler();
