import {  UPDATE_SEARCH_FILTER_CRITERIA } from "../actions/types";

const INITIAL_STATE = {
    type : null,
    searchTerms : null,
    filterCriteria : [],
    size : 15,
    page : 0,
};

const parameterBuilder = (state) => {
    let criterias = state.filterCriteria.map((criteria) => {return (`&${encodeURIComponent(criteria.key)}=${encodeURIComponent(criteria.value)}`)});
    let parameter = `size=${state.size}&page=${state.page}${criterias}`;        
    return parameter;
}

const updateState = (currentState, newState) => {
    const state = {...currentState, ...newState}
    return {...state, parameters: parameterBuilder(state)}
}

export default (state=INITIAL_STATE, action) => {
        switch(action.type) {
        case UPDATE_SEARCH_FILTER_CRITERIA:
            return updateState(state, {filterCriteria: action.filterCriteria});
        default:
            return updateState(state);
    }

};