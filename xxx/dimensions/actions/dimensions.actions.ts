import { createAction, props } from '@ngrx/store';

export const loadDimensions = createAction('[DimensionsStoreService] Load');
export const loadDimensionsSuccess = createAction(
  '[DimensionsStoreService] Load success',
  props<{ data: unknown }>(),
);
export const loadDimensionsFailed = createAction('[DimensionsStoreService] Load failed', props<{ error: unknown }>());
