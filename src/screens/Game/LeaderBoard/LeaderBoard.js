import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './LeaderBoard.css';

const openSave = JSON.parse(window.localStorage.getItem('leaderboard'));

class LeaderBoard extends Component {
  state = {
    open: openSave === undefined ? true : openSave,
  };

  scrollToUser = () => {
    if (this.user) this.user.scrollIntoView({ behavior: 'smooth' });
  };

  handleClick = () => {
    const newState = !this.state.open;
    window.localStorage.setItem('leaderboard', JSON.stringify(newState));
    this.setState({
      open: newState,
    });
    this.scrollToUser();
  };

  getMembersView() {
    const { members } = this.props;
    if (!members) return '';
    const sorted = members.sort((a, b) => b.score - a.score);
    return sorted.map((member, i) => {
      if (!member.username) return '';
      return (
        <li key={i} data-uuid={member.id} className="LeaderBoard__item">
          {i + 1}.&nbsp;
          <input
            className="input--color"
            type="color"
            value={member.color}
            disabled
          />
          <span className="LeaderBoard__username" title={member.username}>
            {member.username}
          </span>
          - {member.score}
          &nbsp;
          <input
            type="checkbox"
            checked={member.guess || false}
            disabled
            value={member.guess || false}
          />
        </li>
      );
    });
  }

  render() {
    const { open } = this.state;
    return (
      <section
        className={`LeaderBoard paper ${open ? 'LeaderBoard--open' : ''}`}
      >
        <button
          type="button"
          className="LeaderBoard__button"
          onClick={this.handleClick}
        >
          <h2 className="LeaderBoard__title">
            <FontAwesomeIcon icon="list-ol" />
            &nbsp;Leaderboard
          </h2>
        </button>
        <ol className="LeaderBoard__list">{this.getMembersView()}</ol>
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
)(LeaderBoard);
