import React, { Component } from 'react';
import { connect } from 'react-redux';

import './LeaderBoard.css';

class LeaderBoard extends Component {
  getMembersView() {
    const { members } = this.props;
    if (!members) return '';
    const sorted = members.sort((a, b) => b.score - a.score);
    return sorted.map((member, i) => {
      if (!member.username) return '';
      return (
        <li key={i} data-uuid={member.id}>
          {i + 1}.&nbsp;
          <input
            className="input--color"
            type="color"
            value={member.color}
            disabled
          />
          &nbsp;
          {member.username} - {member.score}
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
    return (
      <section className="LeaderBoard paper">
        <h2 className="visually-hidden">Leaderboard</h2>
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
