import React, { Component } from 'react';
import { connect } from 'react-redux';

import Countdown from 'components/Countdown/Countdown';
import './Aftermath.css';

class Aftermath extends Component {
  render() {
    const { user, members, videoStats, videoId, points, timeout } = this.props;
    const filtered = members.filter(user => user.guess && user.bonus);
    const sorted = filtered.sort((a, b) => b.bonus - a.bonus);
    const localUser = members.find(member => member.uuid === user.uuid);

    let message = `This video has ${videoStats.viewCount || 0} views. `;
    if (!localUser.guess && !localUser.bonus) {
      message += 'You did not participate this round.';
    } else {
      message += `
        You’ve guessed: ${localUser.guess} views.
        You’ve ranked: ${parseInt(points / localUser.bonus)}.
        You’ve gained: ${localUser.bonus}pts
      `;
    }

    return (
      <section className="Aftermath">
        <h1>
          Aftermath.{' '}
          {timeout ? (
            <React.Fragment>
              Next round in <Countdown time={timeout / 1000} />
            </React.Fragment>
          ) : (
            ''
          )}
        </h1>
        <div>
          <iframe
            className="Aftermath__video"
            src={`https://www.youtube.com/embed/${videoId}`}
          />
          <p>{message}</p>
          <h2>Ranking:</h2>
          <div className="Aftermath__rank--1">
            {videoStats.viewCount || 0} views
          </div>
          <ol className="Aftermath__ranking">
            {sorted.map((member, index) => (
              <li
                key={index}
                className={`Aftermath__rank Aftermath__rank--${index + 1}`}
              >
                {index === 0 ? 'Winner: ' : `${index + 1}.`}
                <strong> {member.username} </strong>
                (guess: {member.guess}) (+{member.bonus}pts)
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  members: state.room.items,
  user: state.user.item,
  videoStats: state.room.videoStats,
  points: state.room.points,
  timeout: state.room.timeout,
  videoId: state.room.videoId,
});

export default connect(
  mapStateToProps,
  null
)(Aftermath);
