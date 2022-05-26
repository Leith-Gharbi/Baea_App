import { ActionTypes } from "../constants/action-types";
export const getDocument = (Base) => {
  return {
    type: ActionTypes.GET_DOCUMENTS,
    payload: Base,
  };
};

export const selectedDocument = (Base) => {
  return {
    type: ActionTypes.SELECTED_DOCUMENT,
    payload: Base,
  };
};
