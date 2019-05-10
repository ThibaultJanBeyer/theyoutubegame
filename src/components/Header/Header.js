import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Header.css';
import { ReactComponent as Logo } from './logo.svg';

const Header = ({ user }) => {
  return (
    <header className="Header" role="banner">
      <section className="Header__container">
        <div className="Header__left">
          <Logo className="Header__logo" />
        </div>
        <div className="Header__right">
          <FontAwesomeIcon
            icon="user-circle"
            title={`User: ${user.username}`}
            size="lg"
          />
        </div>
      </section>
    </header>
  );
};

const mapStateToProps = state => ({
  user: state.user.item,
});

export default connect(
  mapStateToProps,
  null
)(Header);
