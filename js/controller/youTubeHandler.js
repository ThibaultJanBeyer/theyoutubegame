class YouTubeHandler {
  constructor() {
    this.key = 'AIzaSyA5qwSFN4TTTe8rmdrZ1eEhphd6r2FbW9A';
  }

  get randomQuery() {
      // const possible = 
      // 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      // return possible.charAt(Math.floor(Math.random() * possible.length));
      const word = words[Math.floor(Math.random() * words.length)];
      console.info('q:', word);
      return word;
  }

  get randomOrder() {
    const possible = [
      'date',
      'rating',
      'relevance',
      'title',
      'videoCount',
      'viewCount'
    ];
    const order = possible[Math.floor(Math.random() * possible.length)];
    console.info('o:', order);
    return order;
  }

  get randomDateOrder() {
    const time = Math.random() > 0.5 ? 'publishedAfter' : 'publishedBefore';
    console.info('do:', time);
    return time;
  }

  get randomDate() {
    function randomDate(start, end) {
      return new Date(
        start.getTime() + Math.random() * 
        (end.getTime() - start.getTime())
      );
    }
    const date = randomDate(new Date(2006, 0, 1), new Date());
    console.info('d:', date);
    return date.toISOString();
  }

  get userRegion() {
    return fetch('http://ip-api.com/json')
      .then(resp => resp.json())
      .then(resp => resp.countryCode)
      .catch(err => console.error(err));
  }

  getRandomInt(max) {
    const i = Math.floor(Math.random() * max); // The maximum is inclusive and the minimum is inclusive 
    console.info('i:', i);
    return i;
  }

  get yesNo() {
    const b = Math.random() > 0.5;
    console.info('b:', b);
    return b;
  }

  /**
   * Rolls for a random video.
   * pass region code to prevent blocked content.
   * @param {string} location ISO 3166-1 alpha-2 country code e.g. "DE"
   * @param {string} language ISO 639-1 two-letter language code
   */
  roll( location, language ) {
    return fetch(`https://www.googleapis.com/youtube/v3/search
      ?q=${this.randomQuery}
      &maxResults=50
      &${this.yesNo ? 
        `${this.randomDateOrder}=${this.randomDate}`
      : ''}
      &order=${this.randomOrder}
      &type=video
      &part=snippet
      ${location ?
        `&regionCode=${location}`
      : ''}
      ${language ?
        `&relevanceLanguage=${language}`
      : ''}
      &key=${this.key}
      `.replace(/\s/g, ''))
    .then(resp => resp.json())
    .then(resp => {
      if(resp.items)
        return resp.items[this.getRandomInt(resp.items.length)];
      else
        throw resp;
    })
    .then(item => {
      if(item.id && item.id.videoId)
        return item.id.videoId;
      else
        throw item;
    })
    .catch(err => console.error(err));
  }

  /**
   * Returns Video Stats based on ID 
   * @param {string} videoID youtube video ID
   */
  getVideoStats(videoID) {
    return fetch(`
      https://www.googleapis.com/youtube/v3/videos
      ?part=statistics
      &id=${videoID}
      &key=${this.key}
    `.replace(/\s/g, ''))
    .then(resp => resp.json())
    .then(resp => resp.items[0].statistics)
    .catch(err => console.error(err));
  }
}

const youTubeHandler = new YouTubeHandler();
