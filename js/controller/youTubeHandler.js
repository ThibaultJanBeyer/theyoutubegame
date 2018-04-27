class YouTubeHandler {
  constructor() {
    this.key = 'AIzaSyA5qwSFN4TTTe8rmdrZ1eEhphd6r2FbW9A';
  }

  get randomQuery() {
      // const possible = 
      // 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      // return possible.charAt(Math.floor(Math.random() * possible.length));
      const word = words[Math.floor(Math.random() * words.length)];
      console.log(word)
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
    return possible[Math.floor(Math.random() * possible.length)];
  }

  get randomTimeOrder() {
    return Math.random() > 0.5 ? 'publishedAfter' : 'publishedBefore';
  }

  get randomTime() {
    function randomDate(start, end) {
      return new Date(
        start.getTime() + Math.random() * 
        (end.getTime() - start.getTime())
      );
    }

    return randomDate(new Date(2006, 0, 1), new Date())
      .toISOString();
  }

  get userRegion() {
    return fetch('http://ip-api.com/json')
      .then(resp => resp.json())
      .then(resp => resp.countryCode)
      .catch(err => console.error(err));
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max); // The maximum is inclusive and the minimum is inclusive 
  }

  get yesNo() {
    return Math.random() > 0.5;
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
        `${this.randomTimeOrder}=${this.randomTime}`
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
