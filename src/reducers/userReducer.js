import { SIGN_IN, SIGN_OUT } from '../actions/types';
import { removeJWT, userData } from '../common/auth';

const INITIAL_STATE = {
  ...userData()
};

export const userReducer = (state = INITIAL_STATE, action) => {
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
