import { RESET_DESCRIPTOR_FILE, SET_DESCRIPTOR_FILE } from "../actions/types";

const INITIAL_STATE = {
    file: {},
    parsed_descriptor: null
};

const updateFile = (currentState, file, parsed_descriptor) => {
    return { ...currentState, file: file, parsed_descriptor: parsed_descriptor };
}

const updateState = (currentState, newState) => {
    return { ...currentState, ...newState };
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_DESCRIPTOR_FILE:
            return updateFile(state, action.file, action.parsed_descriptor);
        case RESET_DESCRIPTOR_FILE:
            return { ...INITIAL_STATE }
        default:
            return updateState(state);
    }
};