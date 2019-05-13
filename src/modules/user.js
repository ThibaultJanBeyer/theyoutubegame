// Following the reDUCKS pattern https://github.com/erikras/ducks-modular-redux

import { uuid, color } from 'utils/random';

// -----
// Types
// -----
export const AUTH_LOGIN = 'tyg/user/AUTH_LOGIN';
export const AUTH_LOGOUT = 'tyg/user/AUTH_LOGOUT';
export const AUTH_ERROR = 'tyg/user/AUTH_ERROR';

export const PUT_USER = 'tyg/user/PUT_USER';

// -------
// Reducer
// -------

const _userItem = localStorage.getItem('user');
const _user = _userItem ? JSON.parse(_userItem) : false;

const initialState = {
  item: _user || {},
  error: false,
  loggedIn: _user ? true : false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case PUT_USER:
    return {
      ...state,
      item: action.payload,
    };

    // Single User Auth

  case AUTH_LOGIN:
    return {
      ...state,
      item: action.payload,
      loggedIn: true,
    };

  case AUTH_LOGOUT:
    return {
      ...state,
      item: {},
      loggedIn: false,
    };

  case AUTH_ERROR:
    return {
      ...state,
      error: action.payload,
    };

  default:
    return state;
  }
};

// -------
// Actions
// -------

const handleError = (err, dispatch) => {
  return dispatch({
    type: AUTH_ERROR,
    payload: err,
  });
};

export const loginUser = ({ username, password }) => async dispatch =>
  (async () => {
    const user = {
      username,
      uuid: uuid(),
      color: color(),
      role: 'user',
    };
    localStorage.setItem('user', JSON.stringify(user));
    return dispatch({
      type: AUTH_LOGIN,
      payload: user,
    });
  })().catch(err => handleError(err, dispatch));

export const logoutUser = () => dispatch => handleLogout(dispatch);
export const handleLogout = dispatch => {
  localStorage.removeItem('user', dispatch);
  return dispatch({
    type: AUTH_LOGOUT,
    payload: false,
  });
};

export const putUser = user => {
  return {
    type: PUT_USER,
    payload: user,
  };
};
