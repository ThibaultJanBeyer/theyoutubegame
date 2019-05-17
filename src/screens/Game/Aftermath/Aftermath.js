import React, { Component } from 'react';
import { connect } from 'react-redux';
import { putUser } from 'modules/user';

import Countdown from 'components/Countdown/Countdown';
import './Aftermath.css';

class Aftermath extends Component {
  toLocale(number = 0) {
    return parseFloat(parseInt(number)).toLocaleString(navigator.language);
  }

  handleSkip = () => {
    const { user, putUser } = this.props;
    putUser(Object.assign({}, user, { skip: true }));
  }

  render() {
    const { user, members, videoStats, videoId, points, timeout } = this.props;

    const viewCount = this.toLocale(videoStats.viewCount);
    const likeCount = this.toLocale(videoStats.likeCount);
    const dislikeCount = this.toLocale(videoStats.dislikeCount);
    const commentCount = this.toLocale(videoStats.commentCount);

    const filtered = members.filter(user => user.bonus);
    const sorted = filtered.sort((a, b) => b.bonus - a.bonus);
    const localUser = members.find(member => member.uuid === user.uuid);
    if (!localUser) return;

    let message = `This video has ${viewCount} views. `;
    if (typeof localUser.guess !== 'number') {
      message += 'You did not participate this round.';
    } else {
      message += `
        You’ve guessed: ${this.toLocale(localUser.guess)} views.
        You’ve ranked: ${this.toLocale(points / localUser.bonus)}.
        You’ve gained: ${this.toLocale(localUser.bonus)}pts
      `;
    }

    return (
      <section className="Aftermath">
        <h1>
          Aftermath.
          {timeout ? (
            <React.Fragment>
              &nbsp;Next round in <Countdown time={timeout / 1000} />
              <button className="button button--primary" onClick={this.handleSkip}>
                skip
              </button>
            </React.Fragment>
          ) : (
            ''
          )}
        </h1>
        <div>
          <div className="Aftermath__video-container">
            <iframe
              className="Aftermath__video"
              title="video"
              src={`https://www.youtube.com/embed/${videoId}`}
            />
            <div className="Aftermath__video-views">
              <div>
                {viewCount}
                <div className="typography--tiny">views</div>
              </div>
            </div>
          </div>
          <span className="Aftermath__video-sub typography--tiny">
            Likes: {likeCount} | Dislikes: {dislikeCount} | Comments:{' '}
            {commentCount} |&nbsp;
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Open in YouTube
            </a>
          </span>
          <p>{message}</p>
          <h2>Ranking:</h2>
          <ol className="Aftermath__ranking">
            {sorted.map((member, index) => (
              <li
                key={index}
                className={`Aftermath__rank Aftermath__rank--${index + 1}`}
              >
                {index === 0 ? 'Winner: ' : `${index + 1}.`}
                <strong> {member.username} </strong>
                (guess: {this.toLocale(member.guess)}) (+
                {this.toLocale(member.bonus)}pts)
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

const mapActionsToProps = {
putUser
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Aftermath);
