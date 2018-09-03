import { SET_USER_TOKEN } from "../constants/ActionTypes";

export function setUserToken(userToken) {
  return {
    type: SET_USER_TOKEN,
    userToken
  };
}
