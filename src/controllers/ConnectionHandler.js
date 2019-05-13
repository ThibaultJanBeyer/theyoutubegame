import { Component } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';

import { syncRoom } from 'modules/room';
import { putUser } from 'modules/user';

class ConnectionHandler extends Component {
  componentDidMount() {
    const { syncRoom, putUser } = this.props;
    this.socket = openSocket(process.env.REACT_APP_HOST);

    this.socket.on('connect_error', function(data) {
      console.log('connection_error', data);
    });

    this.socket.on('room/sync', data => syncRoom(data));
    this.socket.on('user/sync', data => putUser(data));

    this.updateUser();
  }

  updateUser() {
    const { user } = this.props;
    this.socket.emit('user/sync', user);
  }

  connect(id) {
    const { user } = this.props;
    this.socket.emit('room/join', { id, user });
  }

  disconnect(id, user) {
    this.socket.emit('room/leave', { id, user });
  }

  componentDidUpdate(prevProps) {
    const { roomId, leaving, user } = this.props;
    if (!this.socket) return;
    // Typical usage (don't forget to compare props):
    if (roomId !== prevProps.roomId) {
      this.connect(roomId);
    }
    if (leaving !== prevProps.leaving) {
      this.disconnect(leaving.roomId, leaving.userId);
    }
    if (user !== prevProps.user) {
      this.updateUser(user);
    }
  }

  render() {
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
  putUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ConnectionHandler);
