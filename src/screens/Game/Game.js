import React, { Component } from 'react';

class Game extends Component {
  render() {
    const { match } = this.props;

    return (
      <article className="Game">
        <h1>Let the game begun {match.params.id}</h1>
        <iframe
          width="100%"
          height="100%"
          frameborder="0"
          allow="autoplay"
          src={`
            https://www.youtube.com/embed/${videoID}
              ?autoplay=1
              ${/* !gameStore.ytControls ? '&controls=0' : '' */}
              &rel=0
              ${/* !gameStore.ytTitle ? '&showinfo=0' : '' */}
          `.replace(/\s/g, '')}
        />
        `
      </article>
    );
  }
}

export default Game;
