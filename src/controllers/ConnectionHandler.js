import { Component } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';

import { syncRoom } from 'modules/room';
import { postGuess } from 'modules/user';

class ConnectionHandler extends Component {
  componentDidMount() {
    const { syncRoom } = this.props;
    this.socket = openSocket('http://localhost:8000/');
    this.socket.on('room/sync', data => {
      console.log('sync');
      syncRoom(data);
    });
  }

  connect(id) {
    const { user } = this.props;
    this.socket.emit('room/join', { id, user });
  }

  disconnect(roomId, userId) {
    this.socket.emit('room/leave', { roomId, userId });
  }

  guess(value) {
    const { user, postGuess } = this.props;
    this.socket.emit('user/guess', { value, user });
    postGuess(false);
  }

  render() {
    const { roomId, leaving, user } = this.props;
    if (roomId) this.connect(roomId);
    if (leaving) this.disconnect(leaving.roomId, leaving.userId);
    if (user.item && user.item.guess) this.guess(user.item.guess);
    return null;
  }
}

const mapStateToProps = state => ({
  roomId: state.room.roomId,
  leaving: state.room.leaving,
  user: state.user.item,
});

const mapActionsToProps = {
  syncRoom,
  postGuess,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ConnectionHandler);
