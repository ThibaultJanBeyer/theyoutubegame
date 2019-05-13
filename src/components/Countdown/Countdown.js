import React, { Component } from 'react';
import './Countdown.css';

class Countdown extends Component {
  state = {
    redirect: false,
    hours: '00',
    minutes: '00',
    seconds: '00',
    secondsRemaining: false,
  };
  intervalHandle;

  handleChange = event => {
    this.setState({
      minutes: event.target.value,
    });
  };

  isExpired = () => {
    clearInterval(this.intervalHandle);
  };

  tick = () => {
    let { secondsRemaining } = this.state;
    const hour = Math.floor(secondsRemaining / 60 / 60);
    const min = Math.floor(secondsRemaining / 60) - hour * 60;
    const sec = Math.floor(secondsRemaining - min * 60 - hour * 60 * 60);

    if ((sec <= 0 && min <= 0 && hour <= 0) || sec < 0 || min < 0 || hour < 0)
      return this.isExpired();

    this.setState({
      hours: hour < 10 ? '0' + hour : hour,
      minutes: min < 10 ? '0' + min : min,
      seconds: sec < 10 ? '0' + sec : sec,
      secondsRemaining: secondsRemaining - 1,
    });
  };

  startCountDown = time => {
    this.started = true;
    this.intervalHandle = setInterval(this.tick, 1000);
    this.setState({
      secondsRemaining: time,
    });
  };

  componentDidUpdate(prevProps) {
    const { time } = this.props;
    if (!time) return;
    if (time !== prevProps.time) {
      if (!this.started) return this.startCountDown(time);
      else
        return this.setState({
          secondsRemaining: time,
        });
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandle);
  }

  render() {
    const { time } = this.props;
    const { secondsRemaining } = this.state;
    if (!time) return '';
    return (
      <span
        className={`Countdown ${
          secondsRemaining < 10 ? 'Countdown--alert' : ''
        }`}
      >
        {/* <span className="Countdown__h">{this.state.hours}</span>: */}
        <span className="Countdown__m">{this.state.minutes}</span>:
        <span className="Countdown__s">{this.state.seconds}</span>
      </span>
    );
  }
}

export default Countdown;
