import { SIGN_IN, SIGN_OUT } from "../actions/types";
import { userData, removeJWT } from "../common/auth";

const INITIAL_STATE = {
    isUserSignedIn: false,
    ...userData()
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            console.log("Signing in");
            return {
                ...state,
                isUserSignedIn: true,
                ...userData()
            }
        case SIGN_OUT:
            console.log("Signing out");
            removeJWT();
            return { 
                ...state, 
                isUserSignedIn: false, 
                ...userData() 
            };
        default:
            return state;
    }

};