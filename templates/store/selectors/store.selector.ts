import { createFeatureSelector, createSelector } from '@ngrx/store';
import { {{SELECTOR}}_FEATURE_NAME } from '../const';
import { {{Selector}}State } from '../type/{{selector}}-state.type';

export const select{{Selector}}State = createFeatureSelector<{{Selector}}State>({{SELECTOR}}_FEATURE_NAME);
export const select{{Selector}} = createSelector(select{{Selector}}State, state => state?.data);
export const select{{Selector}}Error = createSelector(select{{Selector}}State, state => state.error);
