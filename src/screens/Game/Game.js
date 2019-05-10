import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getVideo } from 'modules/video';

class Game extends Component {
  componentDidMount() {
    const { getVideo } = this.props;
    getVideo();
  }

  render() {
    const { match, controls, title, video } = this.props;
    const videoNode =
      video && video.id ? (
        <iframe
          title="youtube-video"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay"
          src={`
        https://www.youtube.com/embed/${video.id}
          ?autoplay=1
          ${!controls ? '&controls=0' : ''}
          &rel=0
          ${!title ? '&showinfo=0' : ''}
      `.replace(/\s/g, '')}
        />
      ) : (
        ''
      );

    return (
      <article className="Game">
        <h1>Let the game begun {match.params.id}</h1>
        {videoNode}`
      </article>
    );
  }
}

const mapStateToProps = state => ({
  video: state.video.item,
});

const mapActionsToProps = {
  getVideo,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Game);
