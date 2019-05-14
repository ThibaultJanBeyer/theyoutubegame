import React, { Component } from 'react';
import { connect } from 'react-redux';

import { putUser } from 'modules/user';

import Countdown from 'components/Countdown/Countdown';
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
    putUser(Object.assign({}, user, { guess: +guess }));
    this.setState({
      locked: true,
    });
  };

  render() {
    const { locked } = this.state;
    const { timeout } = this.props;

    return (
      <section className="Guess paper">
        <h2 className="Guess__title">
          {locked ? 'Thank you!' : 'How many views has this video?'}
        </h2>
        {locked ? 'Waiting for other players ' : ''}
        {locked && timeout ? <Countdown time={timeout / 1000} /> : ''}
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
                Submit{' '}
                {timeout ? (
                  <span className="typography--tiny">
                    (<Countdown time={timeout / 1000} />)
                  </span>
                ) : (
                  ''
                )}
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
  timeout: state.room.timeout,
});

const mapActionsToProps = {
  putUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Guess);
