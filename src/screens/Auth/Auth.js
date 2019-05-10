import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
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
    this.props.logoutUser();
  }

  handleSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;

    this.props.loginUser({
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
    if (user.loggedIn)
      return <Redirect to={location.state.from || LINKS.home} />;

    return (
      <Paper className="Auth__paper">
        <FontAwesomeIcon icon="user-circle" size="4x" />

        <h1 className="Auth__title">
          Sign in
          <div className="Auth__appDescription">Customer Verification Tool</div>
        </h1>
        <form onSubmit={this.handleSubmit}>
          <FormControl className="Auth__field" required fullWidth>
            <InputLabel htmlFor="username">LDAP Username</InputLabel>
            <Input
              id="username"
              type="text"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={event => this.setUsernameContent(event.target.value)}
            />
          </FormControl>
          <FormControl className="Auth__field" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={event => this.setPasswordContent(event.target.value)}
            />
          </FormControl>
          <Button
            className="Auth__button"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        </form>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });
const mapActionsToProps = { loginUser, logoutUser };

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps
  )(Auth)
);
