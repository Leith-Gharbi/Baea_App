import { ActionTypes } from '../constants/action-types';
export const LoginRequest = (User) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    payload: User,
  };
};

export const LoginSuccess = (User) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: User,
  };
};

export const logout = (User) => {
  return {
    type: ActionTypes.LOGOUT,
    payload: User,
  };
};
