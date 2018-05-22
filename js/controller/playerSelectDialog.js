class PlayerSelectDialog {
  constructor() {
    this.playerIndex = 1;
    this.addEventListeners();
    this.createDialog();
  }
  
  addEventListeners() {
    topic.subscribe('game/init', () => this.showDialog());
  }

  createDialog() {
    if(this.dialog) { return this.dialog; }

    this.dialog = new A11YDialog({
      type: 'blocker',
      title: 'Player Selection',
      onAccept: this.onAccept.bind(this),
      content: `
        <h2>Shareable Link</h2>
        <p>
          Share this link with your friends so they can connect to the game,
          and add their scores themselves (if you don’t want to share the link, you can also play locally):
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
    topic.publish('game/start');
  }

  showDialog() {
    const shareInput = this.dialog.nodes.content.querySelector('.js-share-link');

    return fetch(`https://api-ssl.bitly.com/v3/shorten?access_token=4327b4486efcbe14e3b64a18c44c9f78f9a50243&domain=j.mp&longUrl=${encodeURIComponent(location.href)}`)
      .then(resp => resp.json())
      .then(resp => {
        const shortUrl = resp.data.url;
        shareInput.value = shortUrl || location.href;
        this.dialog.show();
      })
      .catch(err => {
        console.error(err);
        shareInput.value = location.href;
      });
  }
}

const playerSelectDialog = new PlayerSelectDialog();
