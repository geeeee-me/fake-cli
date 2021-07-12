import { createAction, props } from '@ngrx/store';

export const load{{Selector}} = createAction('[{{Selector}}StoreService] Load');
export const load{{Selector}}Success = createAction(
  '[{{Selector}}StoreService] Load success',
  props<{ data: unknown }>(),
);
export const load{{Selector}}Failed = createAction('[{{Selector}}StoreService] Load failed', props<{ error: unknown }>());
