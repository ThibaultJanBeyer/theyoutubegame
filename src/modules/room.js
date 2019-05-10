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
  roomId: false,
  error: false,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  // Single User Auth

  case SYNC_ROOM:
    return {
      ...state,
      items: action.payload,
    };

  case JOIN_ROOM:
    return {
      ...state,
      roomId: action.payload,
    };

  case LEAVE_ROOM:
    return {
      ...state,
      leaving: action.payload,
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

export const leaveRoom = id => {
  return {
    type: LEAVE_ROOM,
    payload: id,
  };
};

export const syncRoom = data => {
  return {
    type: SYNC_ROOM,
    payload: data,
  };
};
