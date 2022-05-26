import { ActionTypes } from '../constants/action-types';

const initialState = {
  bases: [],
};
export const baseReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_BASE:
      return { ...state, bases: payload };

    default:
      return state;
  }
};

export const selectedBaseReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_BASE:
      return { ...state, ...payload };

    default:
      return state;
  }
};
