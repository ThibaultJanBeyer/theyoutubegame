import { Component } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';

import { syncRoom } from 'modules/room';

class ConnectionHandler extends Component {
  componentDidMount() {
    const { syncRoom } = this.props;
    this.socket = openSocket('http://localhost:8000/');
    this.socket.on('room/sync', data => syncRoom(data));
  }

  connect(id) {
    const { user } = this.props;
    this.socket.emit('room/join', { id, user });
  }

  disconnect(roomId, userId) {
    this.socket.emit('room/leave', { roomId, userId });
  }

  render() {
    const { roomId, leaving } = this.props;
    if (roomId) this.connect(roomId);
    if (leaving) this.disconnect(roomId, leaving);
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
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ConnectionHandler);
