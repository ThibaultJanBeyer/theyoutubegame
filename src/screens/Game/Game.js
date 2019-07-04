import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Game.css';
import YouTubePlayer from './YouTubePlayer/YouTubePlayer';
import Guess from './Guess/Guess';
import Aftermath from './Aftermath/Aftermath';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import Chat from 'components/Chat/Chat';
import { joinRoom, leaveRoom, postMessage } from 'modules/room';

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
    const { videoStats, user, chatMessages, postMessage } = this.props;
    return (
      <article className="Game">
        <LeaderBoard />
        <Chat
          messages={chatMessages}
          onMessage={m =>
            postMessage({
              author: user,
              text: m,
            })
          }
        />
        {videoStats ? (
          <Aftermath />
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
  chatMessages: state.room.chatMessages,
});

const mapActionsToProps = {
  joinRoom,
  leaveRoom,
  postMessage,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Game);
