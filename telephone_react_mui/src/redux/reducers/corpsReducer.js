import { ActionTypes } from '../constants/action-types';

const initialState = {
  corps: [],
};

export const corpsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CORPS:
      return { ...state, corps: payload };

    default:
      return state;
  }
};

export const selectedCorpsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_CORPS:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export const EditCorpsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.EDIT_CORPS:
      return { ...state, ...payload };

    default:
      return state;
  }
};
export const FetchCorpsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LIST_CORPS:
      return { ...state, corps: payload };

    default:
      return state;
  }
};

export const UpdateCorpsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_EDIT:
      return { ...state, ...payload };
    default:
      return state;
  }
};
