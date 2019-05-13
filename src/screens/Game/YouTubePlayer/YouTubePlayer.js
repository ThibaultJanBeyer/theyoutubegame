import React, { Component } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';

import './YouTubePlayer.css';

class YouTubePlayer extends Component {
  state = {
    overlay: true,
  };

  onReady = event => {
    console.log('ready');
    // https://developers.google.com/youtube/iframe_api_reference#playVideo
    this.player = event.target;
    this.setState({ overlay: false });
  };

  render() {
    const { videoId } = this.props;
    const { overlay } = this.state;
    const opts = {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        fs: 0,
        iv_load_policy: 3,
        loop: 1,
        modestbranding: 1,
        // origin: window.location.origin,
        rel: 0,
        showinfo: 0,
      },
    };

    if (!videoId) return '';

    return (
      <React.Fragment>
        {overlay ? <div className="YouTubePlayer__overlay" /> : ''}
        <YouTube
          className="YouTubePlayer"
          videoId={videoId}
          opts={opts}
          onReady={this.onReady}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  videoId: state.room.videoId,
});

export default connect(
  mapStateToProps,
  null
)(YouTubePlayer);
