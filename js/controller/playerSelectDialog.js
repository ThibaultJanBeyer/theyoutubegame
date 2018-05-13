class PlayerSelectDialog {
  constructor() {
    this.playerIndex = 1;
    this.addEventListeners();
    this.createDialog();
  }
  
  addEventListeners() {
    topic.subscribe('game/start', () => this.showDialog());
  }

  createDialog() {
    if(this.dialog) { return this.dialog; }

    this.dialog = new A11YDialog({
      type: 'alert',
      title: 'Player Selection',
      onAccept: this.onAccept.bind(this),
      content: `
        <h2>Shareable Link</h2>
        <p>
          Share this link with your friends so they can connect to the game,
          and add their scores themselves:
        </p>
        <input type="text"
          value="…" onFocus="this.select()"
          class="js-share-link">
        `
    });

    return this.dialog;
  }

  onAccept() {
    console.log("accept");
  }

  onCancel() {
    console.log("cancel");
  }

  showDialog() {
    return fetch(`https://api-ssl.bitly.com/v3/shorten?access_token=4327b4486efcbe14e3b64a18c44c9f78f9a50243&domain=j.mp&longUrl=${encodeURIComponent(location)}`)
      .then(resp => resp.json())
      .then(resp => {
        this.dialog.nodes.content.querySelector('.js-share-link').value = resp.data.url;
        this.dialog.show();
      })
      .catch(err => console.error(err));
  }
}

const playerSelectDialog = new PlayerSelectDialog();
