import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Guess.css';

class Guess extends Component {
  state = {
    guess: false,
  };

  handleSubmit = () => {
    console.log('submit guess');
  };

  render() {
    return (
      <section className="Guess paper">
        <h2 className="Guess__title">How many views has this video?</h2>
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
            />
            <button type="submit" className="button button--primary">
              Submit
            </button>
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  members: state.room.items,
});

export default connect(
  mapStateToProps,
  null
)(Guess);
