import { SIGN_IN, SIGN_OUT } from "../actions/types";
const INITIAL_STATE = {
    isUserSignedIn: false,
    user: null
};


export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            return {...state, isUserSignedIn: true, user: action.payload};
        case SIGN_OUT:
            return {...state, isUserSignedIn: false, user: null};
        default:
            return state;
    }

};