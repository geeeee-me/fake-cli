import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as ownActions from '../actions/dimensions.actions';
import { DimensionsApiService } from '../services/dimensions-api.service';

@Injectable()
export class DimensionsStoreEffects {
  loadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ownActions.loadDimensions),
      switchMap(() =>
        this._dimensionsApiService.load().pipe(
          map(data => ownActions.loadDimensionsSuccess({ data })),
          catchError(error => of(ownActions.loadDimensionsFailed({ error }))),
        ),
      ),
    ),
  );

  constructor(private readonly _dimensionsApiService: DimensionsApiService, private readonly actions$: Actions) {}
}
