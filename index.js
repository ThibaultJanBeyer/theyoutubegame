class Game {
  constructor( node ) {
    this.node = node;

    this.startNode = this.node.querySelector('.js-game-start');
    this.videoNode = this.node.querySelector('.js-game-video');

    this.viewsNode = this.node.querySelector('.js-game-views');

    this.addEventListeners();
  }

  addEventListeners() {
    this.startNode.addEventListener('click', () => this.startUp());
  }

  async startUp() {

    const location = await youTubeHandler.userRegion;
    const videoID = await youTubeHandler.roll(location, 'EN');
    this.drawVideo(videoID);
    this.drawInfo(videoID);

  }

  drawVideo(videoID) {
    this.videoNode.innerHTML = `
      <iframe width="420" height="315" frameborder="0"
        src="${`
          https://www.youtube.com/embed/${videoID}
            ?autoplay=1
            &controls=0
            &rel=0
            &showinfo=0
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
