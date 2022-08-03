import { SIGN_IN, SIGN_OUT } from "../actions/types";
import { userData, removeJWT, authHeader } from "../common/auth";

const INITIAL_STATE = {
    ...userData()
};


export default (state = INITIAL_STATE, action) => {
    authHeader();
    switch (action.type) {
        case SIGN_IN:
            console.log("Signing in");
            return {
                ...state,
                ...userData()
            }
        case SIGN_OUT:
            console.log("Signing out");
            removeJWT();
            return {
                ...state,
                ...userData()
            };
        default:
            return state;
    }

};