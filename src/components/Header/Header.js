import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import './Header.css';
import { LINKS } from 'Routes';
import { ReactComponent as Logo } from './logo_fill.svg';
import { logoutUser } from 'modules/user';

class Header extends Component {
  handleUser = () => {
    const { logoutUser } = this.props;
    logoutUser();
  };

  render() {
    const { user, room } = this.props;
    return (
      <header className="Header" role="banner">
        <section className="Header__container">
          <div className="Header__left">
            <div className="Header__logo-shadow" />
            <Link to={LINKS.home} className="link">
              <Logo className="Header__logo" />
            </Link>
          </div>
          <div className="Header__right">
            {room ? (
              <Link to={LINKS.home} className="link">
                <FontAwesomeIcon
                  icon="door-open"
                  title="leave room"
                  size="lg"
                />
              </Link>
            ) : (
              ''
            )}
            {user.username ? (
              <button className="link" type="button" onClick={this.handleUser}>
                <FontAwesomeIcon
                  icon="sign-out-alt"
                  title={`log out: ${user.username}`}
                  size="lg"
                />
              </button>
            ) : (
              ''
            )}
          </div>
        </section>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.item,
  room: state.room.roomId,
});

const mapActionsToProps = {
  logoutUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Header);
