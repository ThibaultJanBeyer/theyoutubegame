import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './LeaderBoard.css';

class LeaderBoard extends Component {
  getMembersView() {
    const { members } = this.props;
    if (!members) return '';
    const sorted = members.sort((a, b) => a.score > b.score);
    return sorted.map((member, i) => {
      if (!member.username) return;
      return (
        <li key={i}>
          <input
            className="LeaderBoard__color"
            type="color"
            value={member.color}
            readOnly
          />
          &nbsp;
          {member.username} - {member.score}
        </li>
      );
    });
  }

  render() {
    return (
      <section className="LeaderBoard paper">
        <h2 className="LeaderBoard__title">Leaderboard</h2>
        <ol>{this.getMembersView()}</ol>
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
