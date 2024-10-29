import { LCM_SELECT_SERVICE, LCM_SERVICES_LOADED, RESET_LCM_SERVICES } from '../actions/types';

const INITIAL_STATE = {
  id: null,
  services: []
};

const selectLcmService = (currentState, serviceId, lcm) => {
  let services = []
  currentState.services.forEach((service) => {
    if (service.serviceId === serviceId) {
      let updatedService = { serviceId: service.serviceId, serviceName: service.serviceName, applicableLcm: [] }
      service.applicableLcm.forEach((lcmService) => {
        if (lcmService.id === lcm) {
          updatedService.applicableLcm.push({ ...lcmService, selected: true });
        } else {
          // check if the lcm service was selected before
          if (lcmService.selected) {
            updatedService.applicableLcm.push({ ...lcmService, selected: false });
          } else {
            updatedService.applicableLcm.push(lcmService);
          }
        }
      });
      services.push(updatedService);
    } else {
      services.push(service);
    }
  });
  return { ...currentState, services: services };
}
const updateState = (currentState, newState) => {
  return { ...currentState, ...newState };
}

export const lcmReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LCM_SERVICES_LOADED:
    return { ...state, ...{ id: action.id, services: action.services } };
  case RESET_LCM_SERVICES:
    return { ...INITIAL_STATE };
  case LCM_SELECT_SERVICE:
    return selectLcmService(state, action.serviceId, action.lcm);
  default:
    return updateState(state);
  }
};
