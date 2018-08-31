import { SHOW_NOTIFICATION } from "../constants/ActionTypes";

export function showNotification(message, style) {
  return {
    type: SHOW_NOTIFICATION,
    message,
    style
  };
}
