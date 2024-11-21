import { Dispatch, Reducer, useCallback, useReducer } from 'react';
import { Action } from 'redux';

/**
 * Thunk dispatch type definition
 */
export type ThunkDispatch = Dispatch<Action>;

/**
 * Thunk function type definition
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ThunkAction = ((dispatch: ThunkDispatch) => any) | ((dispatch: ThunkDispatch) => Promise<any>);

/**
 * Custom dispatch that can handle both thunks and regular actions.
 *
 * @param reducer is a method that generates the next state based on the current one and a provided action.
 * @param initialState is the initial state from which the reducer starts to generate the followup states.
 */
export const useThunkReducer = <State>(
  reducer: Reducer<State, Action>,
  initialState: State
): [State, Dispatch<Action | ThunkAction>] => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = useCallback(
    (action: Action | ThunkAction) => {
      if (typeof action === 'function') {
        action(dispatch); // If the action is a thunk (function), invoke it
      } else {
        dispatch(action); // Otherwise, pass the action to the reducer
      }
    },
    [dispatch]
  );

  return [state, enhancedDispatch];
}
