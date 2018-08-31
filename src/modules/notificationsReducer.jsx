import { SHOW_NOTIFICATION } from "../constants/ActionTypes";

export default function notification(state = {}, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return Object.assign({}, state, {
        message: action.message,
        style: action.style
      });

    default:
      console.debug("notification reducer :: hit default", action.type);
      return state;
  }
}
