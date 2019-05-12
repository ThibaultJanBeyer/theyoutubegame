import React, { Component } from 'react';
import { connect } from 'react-redux';

import { putUser } from 'modules/user';

import './Guess.css';

class Guess extends Component {
  state = {
    guess: false,
    locked: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { guess } = this.state;
    const { user, putUser } = this.props;
    putUser(Object.assign({}, user, { guess: guess * 1 }));
    this.setState({
      locked: true,
    });
  };

  render() {
    const { locked } = this.state;
    return (
      <section className="Guess paper">
        <h2 className="Guess__title">
          {locked ? 'Thank you!' : 'How many views has this video?'}
        </h2>
        {locked ? 'waiting for other players' : ''}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="guess" className="visually-hidden">
            Enter your guess:
          </label>
          <div className="Guess__actions">
            <input
              id="guess"
              type="number"
              name="guess"
              className="input"
              onChange={event => this.setState({ guess: event.target.value })}
              required
              disabled={locked}
            />
            {!locked ? (
              <button type="submit" className="button button--primary">
                Submit
              </button>
            ) : (
              ''
            )}
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.item,
});

const mapActionsToProps = {
  putUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Guess);
