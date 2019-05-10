import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Game.css';
import LeaderBoard from 'components/LeaderBoard/LeaderBoard';
import { joinRoom, leaveRoom } from 'modules/room';

class Game extends Component {
  componentDidMount() {
    const { match, joinRoom, user } = this.props;
    joinRoom(match.params.id);
    this.user = user;
  }

  componentWillUnmount() {
    const { leaveRoom } = this.props;
    leaveRoom(this.user.id);
  }

  render() {
    const { controls, title, video } = this.props;
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
        <LeaderBoard />
        {videoNode}
      </article>
    );
  }
}

const mapStateToProps = state => ({
  video: state.video.item,
  user: state.user.item,
});

const mapActionsToProps = {
  joinRoom,
  leaveRoom,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Game);
