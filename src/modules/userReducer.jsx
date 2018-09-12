import { SET_USER_TOKEN, SHOW_PROPOSALS } from '../constants/ActionTypes';

export default function user(state = {}, action) {
  switch (action.type) {
    case SET_USER_TOKEN:
      return Object.assign({}, state, {
        userToken: action.userToken,
      });
    case SHOW_PROPOSALS:
      return Object.assign({}, state, {
        proposalsID: action.id,
      });
    default:
      console.debug('user reducer :: hit default', action.type);
      return state;
  }
}
