import { ActionTypes } from '../constants/action-types';

const initialState = {
  User: {},
};
export const loginReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export const logoutReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOGOUT:
      return { ...state, ...payload };

    default:
      return state;
  }
};
