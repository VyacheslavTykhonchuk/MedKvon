import { SET_USER_TOKEN, SHOW_PROPOSALS } from '../constants/ActionTypes';

export function setUserToken(userToken) {
  return {
    type: SET_USER_TOKEN,
    userToken,
  };
}

export function showProposals(id) {
  return {
    type: SHOW_PROPOSALS,
    id,
  };
}
