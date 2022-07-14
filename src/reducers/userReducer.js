import { SIGN_IN, SIGN_OUT } from "../actions/types";
const INITIAL_STATE = {
    isUserSignedIn: false,
    user: {
        'first_name': 'Katherine', 'is_pr': true, 'date_format': 'yyyy-mm-dd',
        'user_role': 'gaiax-ppr',
        // 'user_role': 'gaiax-pcr',
        // 'user_role': 'gaiax-fr',

        'i18n': 'en', 'organization_url': ''
    }
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isUserSignedIn: true };
        case SIGN_OUT:
            return { ...state, isUserSignedIn: false };
        default:
            return state;
    }

};