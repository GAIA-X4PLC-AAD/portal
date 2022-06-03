import { SIGN_IN, SIGN_OUT, } from "../actions/types";
const INITIAL_STATE = {
    isUserSignedIn: false,
    user: {'first_name': 'Katherine'}
};


export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            return {...state, isUserSignedIn: true};
        case SIGN_OUT:
            return {...state, isUserSignedIn: false};
        default:
            return state;
    }

};