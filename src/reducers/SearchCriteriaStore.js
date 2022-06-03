import {  UPDATE_SEARCH_FILTER_CRITERIA } from "../actions/types";

const INITIAL_STATE = {
    type : null,
    searchTerms : null,
    filterCriteria : [],
    size : 15,
    page : 0
};

export default (state=INITIAL_STATE, action) => {
        switch(action.type) {
        case UPDATE_SEARCH_FILTER_CRITERIA:
            return {...state, filterCriteria: action.filterCriteria};
        default:
            return {...state};
    }

};