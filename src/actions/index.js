import {
    SIGN_IN_MENU, NOT_SIGN_IN_MENU, SIGN_IN, SIGN_OUT, UPDATE_SEARCH_FILTER_CRITERIA, UPDATE_SEARCH_PAGE_NUMBER, UPDATE_SEARCH_TYPE, UPDATE_SEARCH_FROM_HOME,
    UPDATE_SEARCH_TYPE_AND_TERM, SET_DESCRIPTOR_FILE, RESET_DESCRIPTOR_FILE, LCM_SERVICES_LOADED, RESET_LCM_SERVICES, LCM_SELECT_SERVICE,CHANGE_USER_ROLE
} from "./types";

export const signInMenuEnter = () => {
    return { type: SIGN_IN_MENU };
};

export const signInMenuQuit = () => {
    return { type: NOT_SIGN_IN_MENU };
};

export const signIn = () => {
    return {
        type: SIGN_IN
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const updateFilterCriteria = (filterCriteria) => {
    return { type: UPDATE_SEARCH_FILTER_CRITERIA, filterCriteria };
};

export const updatePageNumber = (pageNumber) => {
    return { type: UPDATE_SEARCH_PAGE_NUMBER, pageNumber };
};

export const updateSearchType = (type) => {
    return { type: UPDATE_SEARCH_TYPE, searchType: type };
};

export const updateSeartTypeWithTerm = (type, term) => {
    return { type: UPDATE_SEARCH_TYPE_AND_TERM, searchType: type, searchTerm: term };
};


export const updateSearchFromHome = (searchTerm) => {
    return { type: UPDATE_SEARCH_FROM_HOME, searchTerm: searchTerm }
}

export const setDescriptorFile = (file, parsed_descriptor) => {
    return { type: SET_DESCRIPTOR_FILE, file: file, parsed_descriptor: parsed_descriptor }
}

export const resetDescriptorFile = () => {
    return { type: RESET_DESCRIPTOR_FILE }
}

export const lcmServicesLoaded = (id, services) => {
    return { type: LCM_SERVICES_LOADED, id: id, services: services }
}

export const resetLcmServices = () => {
    return { type: RESET_LCM_SERVICES }
}

export const selectLcmService = (serviceName, lcm) => {
    return { type: LCM_SELECT_SERVICE, serviceName, lcm }
}

export const changeUserRole = (role) => {
    return { type: CHANGE_USER_ROLE, role };
};

