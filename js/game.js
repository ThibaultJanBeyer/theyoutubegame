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
      this.firstRoll = false;
    } else {
      this.startUp();
    }
  }

  async startUp() {

    const videoID = await youTubeHandler.roll(gameStore.location, gameStore.language);
    this.drawVideo(videoID);
    this.drawInfo(videoID);
    document.body.classList.add('started');

  }

  drawVideo(videoID) {
    this.videoNode.innerHTML = `
      <iframe width="100%" height="100%" frameborder="0"
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
    const views = stats.viewCount*1;
    this.viewsNode.innerHTML = `
      Views: ${views.toLocaleString()}
    `;
    this.calculateScores(views);
  }

  calculateScores(views) {
    const nearest = playerStore.players.sort(function(a, b){
      return Math.abs(views - a.guess) - Math.abs(views - b.guess);
    });

    this.viewsNode.innerHTML += `
      <div>
        Scores: ${nearest.map((n, i) => {
          return `
            ${i+1}. ${n.name}
            (${(n.guess*1).toLocaleString()})
            +${Math.floor(100 / (i+1))}
          `;
        }).join(' | ')}
      </div>
    `;

    nearest.forEach((n, i) => {
      // n.guess = 0;
      // n.score += Math.floor(100 / (i+1));
      playerStore.players.forEach(player => {
        if(player.id === n.id) {
          player.guess = 0;
          player.score += Math.floor(100 / (i+1));
        }
      });
    });
  }

}

const game = new Game( document.body );

setTimeout(() => {
  document.body.classList.add('loaded');
}, 1000);
