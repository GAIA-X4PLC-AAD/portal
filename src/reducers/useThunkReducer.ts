import { Dispatch, Reducer, useCallback, useReducer } from 'react';
import { AnyAction } from 'redux';

/**
 * Thunk dispatch type definition
 */
export type ThunkDispatch = Dispatch<AnyAction>;

/**
 * Thunk function type definition
 */
export type ThunkAction = ((dispatch: ThunkDispatch) => any) | ((dispatch: ThunkDispatch) => Promise<any>);

/**
 * Custom dispatch that can handle both thunks and regular actions.
 *
 * @param reducer is a method that generates the next state based on the current one and a provided action.
 * @param initialState is the initial state from which the reducer starts to generate the followup states.
 */
export const useThunkReducer = <State>(
  reducer: Reducer<State, AnyAction>,
  initialState: State
): [State, Dispatch<AnyAction | ThunkAction>] => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = useCallback(
    (action: AnyAction | ThunkAction) => {
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
