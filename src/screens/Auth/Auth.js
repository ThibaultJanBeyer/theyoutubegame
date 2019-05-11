import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LINKS } from 'Routes';
import './Auth.css';

import { loginUser, logoutUser } from 'modules/user';

class Auth extends Component {
  state = {
    username: false,
    password: false,
  };

  componentDidMount() {
    const { logoutUser } = this.props;
    logoutUser();
  }

  handleSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;
    const { loginUser } = this.props;

    loginUser({
      username,
      password,
    });
  };

  setUsernameContent(username) {
    this.setState({
      username: username,
    });
  }

  setPasswordContent(password) {
    this.setState({
      password: password,
    });
  }

  render() {
    const { user, location } = this.props;
    if (user.loggedIn) {
      const isLocation =
        location.state && location.state.from.pathname !== LINKS.auth;
      return <Redirect to={isLocation ? location.state.from : LINKS.home} />;
    }

    return (
      <article className="Auth paper center">
        <FontAwesomeIcon icon="user-circle" size="4x" />
        <h1 className="Auth__title">Who are you?</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="Auth__field">
            <label className="db" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              autoComplete="username"
              className="input"
              onChange={event => this.setUsernameContent(event.target.value)}
            />
          </div>
          {/* <div className="Auth__field">
            <label className="db" htmlFor="password">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              className="input"
              onChange={event => this.setPasswordContent(event.target.value)}
            />
          </div> */}
          <div className="Auth__actions">
            <button className="button button--primary" type="submit">
              Start
            </button>
            {/* <button className="button" type="submit">
              Create Account
            </button> */}
          </div>
        </form>
      </article>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });
const mapActionsToProps = { loginUser, logoutUser };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Auth);
