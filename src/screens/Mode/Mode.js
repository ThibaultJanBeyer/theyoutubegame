import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';

import { wordId } from 'utils/random';
import { LINKS } from 'Routes';

import './Mode.css';

class Mode extends Component {
  state = {
    id: false,
  };

  handleSelection(mode) {
    if (mode === 'public') {
      this.setState({ id: mode });
    } else if (mode === 'private') {
      this.setState({ id: wordId() });
    }
  }

  render() {
    const { id } = this.state;
    if (id)
      return (
        <Redirect
          push
          to={{
            pathname: `${LINKS.game}/${id}`,
          }}
        />
      );

    return (
      <article className="Mode">
        <h1>Select Mode</h1>
        <ul className="Mode__ul">
          <li className="Mode__li">
            <button
              type="button"
              className="Mode__link"
              onClick={() => this.handleSelection('public')}
            >
              <FontAwesomeIcon icon="globe-europe" className="Mode__icon" />
              Public
            </button>
          </li>
          <li className="Mode__li">
            <button
              type="button"
              className="Mode__link"
              onClick={() => this.handleSelection('private')}
            >
              <FontAwesomeIcon icon="users" className="Mode__icon" />
              Private
            </button>
          </li>
        </ul>
      </article>
    );
  }
}

export default Mode;
