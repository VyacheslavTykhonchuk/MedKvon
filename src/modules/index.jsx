import { combineReducers } from "redux";
import notification from "./notificationsReducer";
import switches from "./switchesReducer";
import user from "./userReducer";

export default combineReducers({ switches, notification, user });
