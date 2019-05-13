import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Chat.css';

class Chat extends Component {
  state = {
    open: JSON.parse(window.localStorage.getItem('chat')),
    text: '',
  };

  scrollToBottom = () => {
    if (this.messagesEnd)
      this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  handleClick = () => {
    const newState = !this.state.open;
    window.localStorage.setItem('chat', JSON.stringify(newState));
    this.setState({
      open: newState,
    });
    this.scrollToBottom();
  };

  handleNewUserMessage = event => {
    const { onMessage } = this.props;
    if (event.key === 'Enter') {
      onMessage(this.state.text);
      this.setState({
        text: '',
      });
      this.scrollToBottom();
    }
  };

  handleTexting = event => {
    this.setState({
      text: event.target.value,
    });
  };

  render() {
    const { open, text } = this.state;
    const { messages } = this.props;
    return (
      <div className={`Chat ${open ? 'Chat--open' : ''}`}>
        <button
          type="button"
          className="Chat__button"
          onClick={this.handleClick}
        >
          <FontAwesomeIcon icon="comments" />
          &nbsp;Chat
        </button>
        <div className="Chat__content">
          {messages &&
            messages.map((message, index) => (
              <div
                className="Chat__message"
                key={index}
                ref={el => {
                  if (index === messages.length - 1) this.messagesEnd = el;
                }}
              >
                <span className="Chat__name">
                  <input
                    className="input--color"
                    type="color"
                    value={message.author.color}
                    disabled
                  />
                  {message.author.username}:
                </span>
                <span className="Chat__text">{message.text}</span>
              </div>
            ))}
        </div>
        <div className="Chat__input">
          <label htmlFor="message" className="visually-hidden">
            Write a message (hit enter key to send)
          </label>
          <input
            type="text"
            className="input input--fw"
            id="message"
            name="message"
            onChange={this.handleTexting}
            onKeyUp={this.handleNewUserMessage}
            value={text}
          />
        </div>
      </div>
    );
  }
}

export default Chat;
