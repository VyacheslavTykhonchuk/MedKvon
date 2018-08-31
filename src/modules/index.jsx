import { combineReducers } from "redux";
import notification from './notificationsReducer';
import switches from './switchesReducer';


export default combineReducers({ switches,notification });
