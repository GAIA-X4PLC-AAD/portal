import { LCM_SERVICES_LOADED, RESET_LCM_SERVICES, LCM_SELECT_SERVICE } from "../actions/types";

const INITIAL_STATE = {
    id: null,
    services: []
};

const selectLcmService = (currentState, serviceName, lcm) => {
    let services = []
    currentState.services.forEach((service) => {
        if (service.serviceName === serviceName) {
            let updatedService = { serviceName: service.serviceName, applicableLcm: [] }
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

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LCM_SERVICES_LOADED:
            return { ...state, ...{ id: action.id, services: action.services } };
        case RESET_LCM_SERVICES:
            return { ...INITIAL_STATE };
        case LCM_SELECT_SERVICE:
            return selectLcmService(state, action.serviceName, action.lcm);
        default:
            return updateState(state);
    }
};