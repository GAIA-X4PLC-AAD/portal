import { SIGN_IN_MENU, NOT_SIGN_IN_MENU } from "../actions/types";
const INITIAL_STATE = {
    isInSignInMenu: false
};


export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN_MENU:
            return {...state, isInSignInMenu: true};
        case NOT_SIGN_IN_MENU:
            return {...state, isInSignInMenu: false};
        default:
            return {...state , isInSignInMenu: false};
    }

};