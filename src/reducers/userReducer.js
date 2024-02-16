import { SIGN_IN, SIGN_OUT } from "../actions/types.js";
import { userData, removeJWT } from "../common/auth.js";

const INITIAL_STATE = {
    ...userData()
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                ...userData()
            }
        case SIGN_OUT:
            removeJWT();
            return {
                ...state,
                ...userData()
            };
        default:
            return state;
    }

};