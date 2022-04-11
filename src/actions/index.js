import { SIGN_IN_MENU, NOT_SIGN_IN_MENU, SIGN_IN, SIGN_OUT } from "./types";


export const signInMenuEnter = () => {
    return { type: SIGN_IN_MENU};
};

export const signInMenuQuit = () => {
    return { type: NOT_SIGN_IN_MENU};
};

export const signIn = () => {
    return {
        type: SIGN_IN
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};
