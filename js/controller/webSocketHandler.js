class WebSocketHandler {

  constructor() {
    this.interval = setInterval(() => {
      console.log('interval');
      if(location.pathname.indexOf('/g4') >= 0) {
        this.setup();
        clearInterval(this.interval);
      }
    }, 1000);
  }

  setup() {
    this.ws = new WebSocket('ws://localhost:40510');
    this.ws.onopen = this.onOpen.bind(this);
    this.ws.onmessage = this.onMessage.bind(this);
  }

  // event emmited when connected
  onOpen() {
    console.log('websocket is connected ...');

    // sending a send event to websocket server
    this.ws.send('connected');
  }

  // event emmited when receiving message 
  onMessage(ev) {
    console.log(ev);
  }

}

const webSocketHandler = new WebSocketHandler();
