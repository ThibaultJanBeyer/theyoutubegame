import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Game.css';
import Guess from './Guess/Guess';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import { joinRoom, leaveRoom } from 'modules/room';

class Game extends Component {
  componentDidMount() {
    const { match, joinRoom, user } = this.props;
    joinRoom(match.params.id);
    this.user = user;
  }

  componentWillUnmount() {
    const { match, leaveRoom } = this.props;
    leaveRoom({ roomId: match.params.id, userId: this.user.id });
  }

  render() {
    const { controls, title, videoId } = this.props;
    const videoNode = videoId ? (
      <iframe
        className="Game__video"
        title="youtube-video"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay"
        src={`
        https://www.youtube.com/embed/${videoId}
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
        <Guess />
      </article>
    );
  }
}

const mapStateToProps = state => ({
  videoId: state.room.videoId,
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
