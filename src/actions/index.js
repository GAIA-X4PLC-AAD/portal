import { SIGN_IN_MENU, NOT_SIGN_IN_MENU } from "./types";


export const signInMenuEnter = () => {
    return { type: SIGN_IN_MENU};
};

export const signInMenuQuit = () => {
    return { type: NOT_SIGN_IN_MENU};
}