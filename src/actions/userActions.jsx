import {
  SET_USER_TOKEN,
  SHOW_PROPOSALS,
  SET_USER_TYPE,
} from '../constants/ActionTypes';

export function setUserToken(userToken) {
  return {
    type: SET_USER_TOKEN,
    userToken,
  };
}
export function setUserType(userType) {
  return {
    type: SET_USER_TYPE,
    userType,
  };
}

export function showProposals(id) {
  return {
    type: SHOW_PROPOSALS,
    id,
  };
}
