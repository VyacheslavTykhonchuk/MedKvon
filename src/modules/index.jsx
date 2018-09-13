import { combineReducers } from 'redux';
import notification from './notificationsReducer';
import switches from './switchesReducer';
import user from './userReducer';
import formData from './formModule';

export default combineReducers({ switches, notification, user, formData });
