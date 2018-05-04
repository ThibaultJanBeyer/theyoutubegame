class Game {
  constructor( node ) {
    this.node = node;

    this.startNode = this.node.querySelector('.js-game-start');
    this.videoNode = this.node.querySelector('.js-game-video');
    this.viewsNode = this.node.querySelector('.js-game-views');

    this.addEventListeners();
  }

  addEventListeners() {
    this.startNode.addEventListener('click', () => this.startHandler());
    topic.subscribe('game/start', () => this.startUp());
    topic.subscribe('game/roll', () => this.startUp());
  }

  startHandler() {
    if(playerStore.players.length < 1) {
      topic.publish('configuration/init');
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
      <button type="button"
        class="button button--primary button--game">
        Show Views
      </button>
      <button type="button"
        class="nobutton button--game button--reroll link js-re-roll">
        or reroll
      </button>
    `;

    this.viewsNode.querySelector('.js-re-roll').addEventListener('click', () => topic.publish('game/roll'));
    const showButton = this.viewsNode.querySelector('button');
    showButton.addEventListener('click', () => this.showViews(videoID));
  }

  async showViews(videoID) {
    const stats = await youTubeHandler.getVideoStats(videoID);
    const views = stats.viewCount*1;
    const scores = this.calculateScores(views);

    this.viewsNode.innerHTML = `
      <div class="views">
        <div class="views__views">
          Views: ${views.toLocaleString()}
        </div>
        ${scores}
      </div>
    `;
    
  }

  calculateScores(views) {
    const nearest = playerStore.players.sort(function(a, b){
      return Math.abs(views - a.guess) - Math.abs(views - b.guess);
    });

    const node = `
      <div class="views__score">
      ${nearest.map((n, i) => {
        return `
          ${i+1}. ${n.name}
          (${(n.guess*1).toLocaleString()})
          +${Math.floor(100 / (i+1))}
          <br>
        `;
      }).join('')}
      </div>
    `;

    nearest.forEach((n, i) => {
      playerStore.players.forEach(player => {
        if(player.id === n.id) {
          player.guess = 0;
          player.score += Math.floor(100 / (i+1));
        }
      });
    });

    return node;
  }

}

const game = new Game( document.body );

setTimeout(() => {
  document.body.classList.add('loaded');
}, 1000);
