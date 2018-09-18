// import axios from 'axios';

// ------------------------------------
// Actions
// ------------------------------------
export const SET_VIDEO_DATA = 'SET_VIDEO_DATA';

// ------------------------------------
// Action Creators
// ------------------------------------

export const setVideoData = (data) => {
  return {
    type: SET_VIDEO_DATA,
    payload: data,
  };
};

// ------------------------------------
// Reducers
// ------------------------------------

export default function videoCall(state = {}, action) {
  switch (action.type) {
    case SET_VIDEO_DATA:
      return Object.assign({}, state, {
        ...state,
        ...action.payload,
      });
    default:
      console.debug('user reducer :: hit default', action.type);
      return state;
  }
}
