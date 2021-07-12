import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DIMENSIONS_FEATURE_NAME } from '../const';
import { DimensionsState } from '../type/dimensions-state.type';

export const selectDimensionsState = createFeatureSelector<DimensionsState>(DIMENSIONS_FEATURE_NAME);
export const selectDimensions = createSelector(selectDimensionsState, state => state?.data);
export const selectDimensionsError = createSelector(selectDimensionsState, state => state.error);
