import { ActionTypes } from '../constants/action-types';
export const setCorps = (Corps) => {
  return {
    type: ActionTypes.SET_CORPS,
    payload: Corps,
  };
};

export const selectedCorps = (Corps) => {
  return {
    type: ActionTypes.SELECTED_CORPS,
    payload: Corps,
  };
};

export const editCorps = (Corps) => {
  return {
    type: ActionTypes.EDIT_CORPS,
    payload: Corps,
  };
};

export const corpsForEdit = (edit) => {
  return {
    type: ActionTypes.SET_EDIT,
    payload: { edit },
  };
};
export const fetchCorpsList = (Corps) => {
  return {
    type: ActionTypes.LIST_CORPS,
    payload: Corps,
  };
};
