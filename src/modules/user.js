// Following the reDUCKS pattern https://github.com/erikras/ducks-modular-redux

import { uuid, color, wordId } from 'utils/random';

// -----
// Types
// -----
export const AUTH_LOGIN = 'tyg/user/AUTH_LOGIN';
export const AUTH_LOGOUT = 'tyg/user/AUTH_LOGOUT';
export const AUTH_ERROR = 'tyg/user/AUTH_ERROR';

export const POST_GUESS = 'tyg/user/POST_GUESS';

// -------
// Reducer
// -------

const _userItem = localStorage.getItem('user');
const _user = _userItem ? JSON.parse(_userItem) : false;

const defaultUser = {
  color: color(),
  id: uuid(),
  username: wordId(),
  score: 0,
  guess: false,
  role: 'user',
};

const initialState = {
  items: [],
  item: _user || {},
  error: false,
  loggedIn: _user ? true : false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case POST_GUESS:
    state.item.guess = action.payload;
    return {
      ...state,
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
    // const request = await fetch(`${ENDPOINT_API}/auth/login`, {
    //   method: 'POST',
    //   mode: 'cors',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username: username,
    //     password: password,
    //   }),
    // });
    // const response = await request.json();
    // if (!request.ok) throw response;

    setTimeout(() => {
      const user = Object.assign({}, defaultUser, { username });
      localStorage.setItem('user', JSON.stringify(user));
      return dispatch({
        type: AUTH_LOGIN,
        payload: user,
      });
    }, 1000);
  })().catch(err => handleError(err, dispatch));

export const logoutUser = () => dispatch => handleLogout(dispatch);
export const handleLogout = dispatch => {
  localStorage.removeItem('user', dispatch);
  return dispatch({
    type: AUTH_LOGOUT,
    payload: false,
  });
};

export const postGuess = guess => {
  return {
    type: POST_GUESS,
    payload: guess,
  };
};
