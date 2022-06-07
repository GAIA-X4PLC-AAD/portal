import {  UPDATE_SEARCH_FILTER_CRITERIA , UPDATE_PAGE_NUMBER} from "../actions/types";

const INITIAL_STATE = {
    type : null,
    searchTerms : null,
    filterCriteria : [],
    size : 15,
    page : 1,
};

const parameterBuilder = (state) => {
    let criterias = state.filterCriteria.map((criteria) => {return (`&${encodeURIComponent(criteria.key)}=${encodeURIComponent(criteria.value)}`)}).
    reduce((previous, current) => previous+current, '');
    let searchTerm = state.searchTerm?`&search_term=${encodeURIComponent(state.searchTerm)}`:'';
    let parameter = `size=${state.size}&page=${state.page}${searchTerm}${criterias}`;        
    return parameter;
}

const updateState = (currentState, newState) => {
    const state = {...currentState, ...newState, page: 1}
    return {...state, parameters: parameterBuilder(state)}
}

const updatePage = (currentState, pageNumber) => {
    const state = {...currentState, page: pageNumber}
    return {...state, parameters: parameterBuilder(state)}
}


export default (state=INITIAL_STATE, action) => {
        switch(action.type) {
        case UPDATE_SEARCH_FILTER_CRITERIA:
            return updateState(state, action.filterCriteria);
         case UPDATE_PAGE_NUMBER:
                return updatePage(state, action.pageNumber);
            default:
            return updateState(state);
    }

};