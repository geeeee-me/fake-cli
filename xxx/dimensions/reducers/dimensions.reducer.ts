import { Action, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import * as ownActions from '../actions/dimensions.actions';
import { DimensionsState } from '../type/dimensions-state.type';

export const initialState: DimensionsState = {
  data: {},
  isLoading: false,
  error: undefined,
};

const featureReducer = createReducer(
  initialState,

  on(ownActions.loadDimensions, state =>
    produce(state, newState => {
      newState.isLoading = true;
      newState.error = undefined;
    }),
  ),

  on(ownActions.loadDimensionsSuccess, (state, action) =>
    produce(state, newState => {
      newState.isLoading = false;
      newState.data = action.data;
    }),
  ),

  on(ownActions.loadDimensionsFailed, (state, action) =>
    produce(state, newState => {
      newState.isLoading = false;
      newState.error = action.error;
    }),
  ),
);

export function reducer(state: DimensionsState | undefined, action: Action) {
  return featureReducer(state, action);
}
