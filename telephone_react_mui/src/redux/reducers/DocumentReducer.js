import { ActionTypes } from "../constants/action-types";

const initialState = {
  documents: [],
};
export const documentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_DOCUMENTS:
      return { ...state, documents: payload };

    default:
      return state;
  }
};

export const selectedDocumentReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_BASE:
      return { ...state, ...payload };

    default:
      return state;
  }
};
