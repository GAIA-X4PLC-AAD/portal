import { SIGN_IN_MENU, NOT_SIGN_IN_MENU, SIGN_IN, SIGN_OUT, UPDATE_SEARCH_FILTER_CRITERIA, UPDATE_SEARCH_PAGE_NUMBER, UPDATE_SEARCH_TYPE, UPDATE_SEARCH_FROM_HOME, UPDATE_SEARCH_TYPE_AND_TERM, UPDATE_SELECTED_PAGE } from "./types";


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
    return {type: UPDATE_SEARCH_FILTER_CRITERIA, filterCriteria};
};

export const updatePageNumber = (pageNumber) => {
    return {type: UPDATE_SEARCH_PAGE_NUMBER, pageNumber};
};

export const updateSearchType = (type) => {
    return {type: UPDATE_SEARCH_TYPE, searchType: type};
};

export const updateSeartTypeWithTerm = (type, term) => {
    return {type: UPDATE_SEARCH_TYPE_AND_TERM, searchType: type, searchTerm:term};
};


export const updateSearchFromHome = (searchTerm) => {
    return {type: UPDATE_SEARCH_FROM_HOME, searchTerm: searchTerm}
}