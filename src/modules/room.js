// -----
// Types
// -----
export const JOIN_ROOM = 'tyg/room/JOIN_ROOM';
export const LEAVE_ROOM = 'tyg/room/LEAVE_ROOM';
export const SYNC_ROOM = 'tyg/room/SYNC_ROOM';

export const ROOM_BEGIN = 'tyg/room/ROOM_BEGIN';
export const ROOM_ERROR = 'tyg/room/ROOM_ERROR';

// -------
// Reducer
// -------

const initialState = {
  items: [],
  videoId: false,
  videoStats: false,
  points: false,
  roomId: false,
  timeout: false,
  error: false,
  leaving: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  // Single User Auth

  case SYNC_ROOM:
    return {
      ...state,
      items: action.payload.members,
      videoId: action.payload.videoId,
      videoStats: action.payload.videoStats,
      points: action.payload.points,
      timeout: action.payload.timeout,
    };

  case JOIN_ROOM:
    return {
      ...state,
      roomId: action.payload,
      leaving: false,
    };

  case LEAVE_ROOM:
    return {
      ...state,
      leaving: action.payload,
      roomId: false,
    };

  default:
    return state;
  }
};

// -------
// Actions
// -------
export const joinRoom = id => {
  return {
    type: JOIN_ROOM,
    payload: id,
  };
};

export const leaveRoom = object => {
  return {
    type: LEAVE_ROOM,
    payload: object,
  };
};

export const syncRoom = data => {
  return {
    type: SYNC_ROOM,
    payload: data,
  };
};
