import { SET_USER_TOKEN } from "../constants/ActionTypes";

export default function user(state = {}, action) {
  switch (action.type) {
    case SET_USER_TOKEN:
      return Object.assign({}, state, {
        userToken: action.userToken
      });
    default:
      console.debug("user reducer :: hit default", action.type);
      return state;
  }
}
