import { UPDATE_SEARCH_FILTER_CRITERIA, UPDATE_SEARCH_FROM_HOME, UPDATE_SEARCH_PAGE_NUMBER, UPDATE_SEARCH_TYPE, UPDATE_SEARCH_TYPE_AND_TERM } from "../actions/types";

const INITIAL_STATE = {
    type: null,
    searchTerms: "",
    filterCriteria: [],
    size: 15,
    page: 1,
    sort_field: '',
    sort_direction: 'ASC'
};

const parameterBuilder = (state) => {

    let criterias = state.filterCriteria.map((criteria) => { return (`&${encodeURIComponent(criteria.key)}=${encodeURIComponent(criteria.value)}`) }).
        reduce((previous, current) => previous + current, '');
    let sort = state.sort_field ? `&sort_field=${state.sort_field}&sort_direction=${state.sort_direction}` : '';
    let searchTerm = state.searchTerms ? `&search_terms=${encodeURIComponent(state.searchTerms)}` : '';
    let parameter = `size=${state.size}&page=${state.page}${searchTerm}${criterias}${sort}`;
    return parameter;
}

const updateState = (currentState, newState) => {
    const state = { ...currentState, ...newState, page: 1 }
    return { ...state, parameters: parameterBuilder(state) }
}

const updatePage = (currentState, pageNumber) => {
    const state = { ...currentState, page: pageNumber }
    return { ...state, parameters: parameterBuilder(state) }
}

const setInitialStateType = (type) => {
    let sort_field = type === 'participant' || type === 'management' ? 'participant_name' : '';
    let sort_direction = type === 'participant' || type === 'management' ? 'ASC' : '';
    const state = { ...INITIAL_STATE, type: type, sort_field: sort_field, sort_direction: sort_direction };
    return { ...state, parameters: parameterBuilder(state) }
}

const setInitialStateTypeTerm = (type, searchTerm) => {
    const state = { ...INITIAL_STATE, type: type, searchTerms: searchTerm };
    return { ...state, parameters: parameterBuilder(state) }
}

const setSearchTermFromHome = (searchTerm) => {
    const state = { ...INITIAL_STATE, type: "home", searchTerms: searchTerm };
    return { ...state, parameters: parameterBuilder(state) }
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_SEARCH_FILTER_CRITERIA:
            return updateState(state, action.filterCriteria);
        case UPDATE_SEARCH_PAGE_NUMBER:
            return updatePage(state, action.pageNumber);
        case UPDATE_SEARCH_TYPE:
            return setInitialStateType(action.searchType);
        case UPDATE_SEARCH_TYPE_AND_TERM:
            return setInitialStateTypeTerm(action.searchType, action.searchTerm);
        case UPDATE_SEARCH_FROM_HOME:
            return setSearchTermFromHome(action.searchTerm);
        default:
            return updateState(state);
    }

};