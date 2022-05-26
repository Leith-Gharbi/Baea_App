import { ActionTypes } from "../constants/action-types";
export const setBase = (Base) => {
  return {
    type: ActionTypes.SET_BASE,
    payload: Base,
  };
};

export const selectedBase = (Base) => {
  return {
    type: ActionTypes.SELECTED_BASE,
    payload: Base,
  };
};
