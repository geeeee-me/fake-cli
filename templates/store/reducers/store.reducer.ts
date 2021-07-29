import { Action, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import * as ownActions from '../actions/{{selector}}.actions';
import { {{Selector}}State } from '../type/{{selector}}-state.type';

export const initialState: {{Selector}}State = {
  data: undefined,
  isLoading: false,
  error: undefined,
};

const featureReducer = createReducer(
  initialState,

  on(ownActions.load{{Selector}}, state =>
    produce(state, newState => {
      newState.isLoading = true;
      newState.error = undefined;
    }),
  ),

  on(ownActions.load{{Selector}}Success, (state, action) =>
    produce(state, newState => {
      newState.isLoading = false;
      newState.data = action.data;
    }),
  ),

  on(ownActions.load{{Selector}}Failed, (state, action) =>
    produce(state, newState => {
      newState.isLoading = false;
      newState.error = action.error;
    }),
  ),
);

export function reducer(state: {{Selector}}State | undefined, action: Action) {
  return featureReducer(state, action);
}
