import {  UPDATE_SEARCH_FILTER_CRITERIA , UPDATE_SEARCH_PAGE_NUMBER, UPDATE_SEARCH_TYPE} from "../actions/types";

const INITIAL_STATE = {
    type : null,
    searchTerms : "",
    filterCriteria : [],
    size : 15,
    page : 1,
};

const parameterBuilder = (state) => {
    let criterias = state.filterCriteria.map((criteria) => {return (`&${encodeURIComponent(criteria.key)}=${encodeURIComponent(criteria.value)}`)}).
    reduce((previous, current) => previous+current, '');
    let searchTerm = state.searchTerms?`&search_terms=${encodeURIComponent(state.searchTerms)}`:'';
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

const setInitialStateType = (type)=>{
    const state = {...INITIAL_STATE, type: type};
    return {...state, parameters: parameterBuilder(state)}
}

export default (state=INITIAL_STATE, action) => {
        switch(action.type) {
        case UPDATE_SEARCH_FILTER_CRITERIA:
            return updateState(state, action.filterCriteria);
         case UPDATE_SEARCH_PAGE_NUMBER:
                return updatePage(state, action.pageNumber);
         case UPDATE_SEARCH_TYPE:
                return setInitialStateType(action.searchType);
        default:
            return updateState(state);
    }

};