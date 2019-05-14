import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Footer.css';

export default function Footer() {
  return (
    <footer className="Footer" role="banner">
      <a
        href="https://github.com/ThibaultJanBeyer/theyoutubegame"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="link"
      >
        <FontAwesomeIcon
          icon={['fab', 'github']}
          title="view game on github"
          size="lg"
        />
      </a>
    </footer>
  );
}
