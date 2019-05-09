import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { LINKS } from 'Routes';

const Dashboard = () => {
  return (
    <div className="NotFound">
      <FontAwesomeIcon icon="question-circle" />
      <h1>Route not found</h1>

      <p>
        Seems that the link you are trying to access is broken. This could be
        because your role permissions, a bug in our system or just an outdated
        bookmark.
      </p>

      <Link to={LINKS.home} className="link">
        Back Home
      </Link>
    </div>
  );
};

export default Dashboard;
