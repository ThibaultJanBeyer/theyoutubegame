import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Header.css';
import { ReactComponent as Logo } from './logo.svg';
import { logoutUser } from 'modules/user';

class Header extends Component {
  handleUser = () => {
    const { logoutUser } = this.props;
    logoutUser();
  };

  render() {
    const { user } = this.props;
    return (
      <header className="Header" role="banner">
        <section className="Header__container">
          <div className="Header__left">
            <Logo className="Header__logo" />
          </div>
          <div className="Header__right">
            {user.username ? (
              <button className="link" type="button" onClick={this.handleUser}>
                <FontAwesomeIcon
                  icon="user-circle"
                  title={`User: ${user.username}`}
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
});

const mapActionsToProps = {
  logoutUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Header);
