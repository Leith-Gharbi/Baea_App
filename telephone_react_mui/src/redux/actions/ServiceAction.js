import { ActionTypes } from '../constants/action-types';
export const setService = (Service) => {
  return {
    type: ActionTypes.SET_SERVICE,
    payload: Service,
  };
};

export const selectedService = (Service) => {
  return {
    type: ActionTypes.SELECTED_SERVICE,
    payload: Service,
  };
};
