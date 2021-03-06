import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import './Layout.css';

const Layout = ({ title, children }) => {
  const fullTitle = title
    ? `${title} - Customer Verification Tool`
    : 'Customer Verification Tool';
  return (
    <React.Fragment>
      <Helmet>
        <title>{fullTitle}</title>
      </Helmet>
      <div className="Layout">
        <div className="header">
          <Header />
        </div>
        <div className="main">{children}</div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  header: PropTypes.object,
  title: PropTypes.string,
};

export default Layout;
