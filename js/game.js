class Game {
  constructor( node ) {
    this.node = node;
    this.firstRoll = true;

    this.startNode = this.node.querySelector('.js-game-start');
    this.videoNode = this.node.querySelector('.js-game-video');
    this.viewsNode = this.node.querySelector('.js-game-views');

    this.addEventListeners();
  }

  addEventListeners() {
    this.startNode.addEventListener('click', () => this.startHandler());
    topic.subscribe('game/start', () => this.startUp());
  }

  startHandler() {
    if(this.firstRoll) {
      topic.publish('configuration/init');
      this.firstRoll = true;
    } else {
      this.startUp();
    }
  }

  async startUp() {

    const videoID = await youTubeHandler.roll(gameStore.location, gameStore.language);
    this.drawVideo(videoID);
    this.drawInfo(videoID);

  }

  drawVideo(videoID) {
    this.videoNode.innerHTML = `
      <iframe width="100%" height="500" frameborder="0"
        src="${`
          https://www.youtube.com/embed/${videoID}
            ?autoplay=1
            ${!gameStore.ytControls ? '&controls=0' : ''}
            &rel=0
            ${!gameStore.ytTitle ? '&showinfo=0' : ''}
        `.replace(/\s/g, '')}"
      ></iframe>`;
  }

  drawInfo(videoID) {
    this.viewsNode.innerHTML = `
      <button>
        Show Views
      </button>
    `;

    const showButton = this.viewsNode.querySelector('button');
    showButton.addEventListener('click', () => this.showViews(videoID));
  }

  async showViews(videoID) {
    const stats = await youTubeHandler.getVideoStats(videoID);
    this.viewsNode.innerHTML = `
      Views: ${(stats.viewCount*1).toLocaleString()}
    `;
  }

}

const game = new Game( document.body );
