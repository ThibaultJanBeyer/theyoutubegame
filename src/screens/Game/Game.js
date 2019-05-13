import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Game.css';
import YouTubePlayer from './YouTubePlayer/YouTubePlayer';
import Guess from './Guess/Guess';
import Aftermath from './Aftermath/Aftermath';
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
    const { videoStats } = this.props;
    return (
      <article className="Game">
        <LeaderBoard />
        {videoStats ? (
          <React.Fragment>
            <Aftermath />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <YouTubePlayer />
            <Guess />
          </React.Fragment>
        )}
      </article>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.item,
  videoStats: state.room.videoStats,
});

const mapActionsToProps = {
  joinRoom,
  leaveRoom,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Game);
