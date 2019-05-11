import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from 'screens/Layout/Layout';
import PrivateRoute from 'controllers/PrivateRoute';

import Game from 'screens/Game/Game';
import Mode from 'screens/Mode/Mode';
import Auth from 'screens/Auth/Auth';
import NotFound from 'screens/NotFound/NotFound';

export const LINKS = {
  home: '/',
  mode: '/mode',
  game: '/game',
  auth: '/auth',
};

const ROUTES = [
  {
    title: 'Welcome',
    redirect: LINKS.mode,
    path: LINKS.home,
  },
  {
    title: 'Choose your game mode',
    component: Mode,
    path: LINKS.mode,
    private: true,
  },
  {
    title: 'Game',
    component: Game,
    path: LINKS.game,
    withId: true,
    private: true,
  },
  {
    title: 'Auth',
    component: Auth,
    path: LINKS.auth,
  },
];

const getPath = route => {
  if (route.withId) return `${route.path}/:id`;
  else return route.path;
};

const getBasePath = route => {
  if (route.path.indexOf('create')) return route.path.split('/create')[0];
  else return route.path;
};

const getTitle = (route, match) => {
  if (route.withId) return `${match.params.id} – ${route.title}`;
  else return route.title;
};

const Routes = () => {
  return (
    <Switch>
      {ROUTES.map((route, index) => {
        const Component = route.private ? PrivateRoute : Route;
        return React.createElement(
          Component,
          {
            key: index,
            exact: true,
            role: route.role,
            path: getPath(route),
            component: ({ match, location }) => {
              if (route.redirect) return <Redirect to={route.redirect} />;

              const title = getTitle(route, match);
              const type = route.type;
              const basePath = getBasePath(route);
              return (
                <Layout title={title}>
                  {React.createElement(
                    route.component,
                    { match, type, basePath, title, location },
                    null
                  )}
                </Layout>
              );
            },
          },
          null
        );
      })}
      <Route>
        <Layout title="404 – Not Found">
          <NotFound />
        </Layout>
      </Route>
    </Switch>
  );
};

export default Routes;
