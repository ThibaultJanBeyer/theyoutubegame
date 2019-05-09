// -----
// Types
// -----
export const GET_VIDEO = 'tyg/video/GET_VIDEO';
export const POST_VIDEO = 'tyg/video/POST_VIDEO';

export const VIDEO_BEGIN = 'tyg/video/VIDEO_BEGIN';
export const VIDEO_ERROR = 'tyg/video/VIDEO˚_ERROR';

// -------
// Reducer
// -------

const initialState = {
  item: {},
  error: false,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  // Single User Auth

  case VIDEO_BEGIN:
    return {
      ...state,
      item: {},
      loading: true,
      error: false,
    };

  case VIDEO_ERROR:
    return {
      ...state,
      error: action.payload,
      score: false,
      loading: false,
    };

    // POST

  case POST_VIDEO:
    return {
      ...state,
      item: action.payload,
      loading: false,
      error: false,
    };

  default:
    return state;
  }
};

// -------
// Actions
// -------

export const handleError = (err, dispatch) => {
  return dispatch({
    type: VIDEO_ERROR,
    payload: err,
  });
};

export const getVideo = () => {
  return {
    type: VIDEO_BEGIN,
  };
};

export const postVideo = payload => {
  return {
    type: POST_VIDEO,
    payload,
  };
};
