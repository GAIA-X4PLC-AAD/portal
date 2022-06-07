import { SIGN_IN_MENU, NOT_SIGN_IN_MENU, SIGN_IN, SIGN_OUT, UPDATE_SEARCH_FILTER_CRITERIA, UPDATE_PAGE_NUMBER } from "./types";


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
    return {type: UPDATE_PAGE_NUMBER, pageNumber};
};