import { combineReducers } from "redux";

const switches = (state = [], action) => {
  switch (action.type) {
    case "TOGGLE_SWITCH":
      return state.map(
        switches =>
          switches.id === action.id
            ? { ...switches, isActive: !switches.isActive }
            : switches
      );
    default:
      return state;
  }
};

export default combineReducers({ switches });
