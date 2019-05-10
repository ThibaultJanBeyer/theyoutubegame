import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import ConnectionHandler from 'controllers/ConnectionHandler';
import YouTubeHandler from 'controllers/YouTubeHandler';
import Theme from 'theme';
import store from 'modules/store';
import Routes from 'Routes';

const app = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <YouTubeHandler />
      <ConnectionHandler />
      <Theme>
        <Routes />
      </Theme>
    </BrowserRouter>
  </Provider>,
  app
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
