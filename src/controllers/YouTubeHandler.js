import { Component } from 'react';
import { connect } from 'react-redux';

import { postVideo } from 'modules/video';
import { query, date, boolean, int } from 'utils/random';

const key = 'AIzaSyA5qwSFN4TTTe8rmdrZ1eEhphd6r2FbW9A';

class YouTubeHandler extends Component {
  state = {
    videoId: null,
  };

  render() {
    const { videoRequest, postVideo } = this.props;
    const { videoId } = this.state;
    if (videoRequest) this.roll();
    if (videoId) postVideo({ id: videoId });
    return null;
  }

  get randomOrder() {
    const possible = [
      'date',
      'rating',
      'relevance',
      'title',
      'videoCount',
      'viewCount',
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

  get userRegion() {
    return fetch('https://geoip-db.com/json')
      .then(resp => resp.json())
      .then(resp => resp['country_code'])
      .catch(err => console.error(err));
  }

  /**
   * Rolls for a random video.
   * pass region code to prevent blocked content.
   * @param {string} location ISO 3166-1 alpha-2 country code e.g. "DE"
   * @param {string} language ISO 639-1 two-letter language code
   */
  roll(location, language) {
    console.log('l:', location, 'la:', language);
    return fetch(
      `https://www.googleapis.com/youtube/v3/search
      ?q=${query()}
      &maxResults=50
      &${boolean ? `${this.randomDateOrder}=${date()}` : ''}
      &order=${this.randomOrder}
      &type=video
      &part=snippet
      ${location ? `&regionCode=${location}` : ''}
      ${language ? `&relevanceLanguage=${language}` : ''}
      &key=${key}
      `.replace(/\s/g, '')
    )
      .then(resp => resp.json())
      .then(resp => {
        if (resp.items) return resp.items[int(0, resp.items.length)];
        else throw resp;
      })
      .then(item => {
        if (item.id && item.id.videoId) return item.id.videoId;
        else throw item;
      })
      .then(videoId => this.setState({ videoId }))
      .catch(err => console.error(err));
  }

  /**
   * Returns Video Stats based on ID
   * @param {string} videoID youtube video ID
   */
  getVideoStats(videoID) {
    return fetch(
      `
      https://www.googleapis.com/youtube/v3/videos
      ?part=statistics
      &id=${videoID}
      &key=${key}
    `.replace(/\s/g, '')
    )
      .then(resp => resp.json())
      .then(resp => resp.items[0].statistics)
      .catch(err => console.error(err));
  }
}

const mapStateToProps = state => ({
  videoRequest: state.video.loading,
});

const mapActionsToProps = {
  postVideo,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(YouTubeHandler);
