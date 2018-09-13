import axios from 'axios';

// ------------------------------------
// Actions
// ------------------------------------
export const REQUEST_BODY_DOCTORS = 'REQUEST_BODY_DOCTORS';
export const CHOOSE_BODYPART = 'CHOOSE_BODYPART';
export const CHOOSE_DOCTOR_SPECIALIZATION = 'CHOOSE_DOCTOR_SPECIALIZATION';
export const RECEIVE_DOCTORS = 'RECEIVE_DOCTORS';
export const SET_SPECIALIZATION_ID = 'SET_SPECIALIZATION_ID';
export const SET_DOCTORS_IDS_STR = 'SET_DOCTORS_IDS_STR';
// ------------------------------------
// Action Creators
// ------------------------------------

export const requestDocsList = (data) => {
  return {
    type: REQUEST_BODY_DOCTORS,
    payload: data,
  };
};

export const chooseBodyPart = (data) => {
  return {
    type: CHOOSE_BODYPART,
    payload: data,
  };
};

export const chooseDocSpec = (data) => {
  return {
    type: CHOOSE_DOCTOR_SPECIALIZATION,
    payload: data,
  };
};

export const fetchPosts = (id) => {
  return (dispatch) => {
    return axios
      .post(`https://videodoctor.pp.ua/api_v1/order/getdoctorslist`, {
        category_id: id,
      })
      .then((response) => {
        return response.data.data;
      })
      .then((data) => dispatch(receiveDoctors(data)));
  };
};

export const setSpecialization = (id) => {
  return {
    type: SET_SPECIALIZATION_ID,
    payload: id,
  };
};

export const receiveDoctors = (data) => {
  return {
    type: RECEIVE_DOCTORS,
    payload: { ...data },
  };
};

export const setDoctorsIdsStr = (str) => {
  return {
    type: SET_DOCTORS_IDS_STR,
    payload: str,
  };
};

// ------------------------------------
// Reducers
// ------------------------------------

export default function formData(state = {}, action) {
  switch (action.type) {
    case REQUEST_BODY_DOCTORS:
      return Object.assign({}, state, {
        ...state,
        ticket: { ...action.payload },
      });
    case CHOOSE_BODYPART:
      return Object.assign({}, state, {
        ...state,
        bodyPart: action.payload,
      });
    case CHOOSE_DOCTOR_SPECIALIZATION:
      return Object.assign({}, state, {
        ...state,
        doctorSpec: action,
      });
    case RECEIVE_DOCTORS:
      return Object.assign({}, state, {
        ...state,
        doctorNames: { ...action.payload },
      });
    case SET_SPECIALIZATION_ID:
      return Object.assign({}, state, {
        ...state,
        docSpecId: action.payload,
      });
    case SET_DOCTORS_IDS_STR:
      return Object.assign({}, state, {
        ...state,
        doctorsIdsStr: action.payload,
      });
    default:
      console.debug('user reducer :: hit default', action.type);
      return state;
  }
}
