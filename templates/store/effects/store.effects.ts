import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as ownActions from '../actions/{{selector}}.actions';
import { {{Selector}}ApiService } from '../services/{{selector}}-api.service';

@Injectable()
export class {{Selector}}StoreEffects {
  loadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ownActions.load{{Selector}}),
      switchMap(() =>
        this._{{selector}}ApiService.load().pipe(
          map(data => ownActions.load{{Selector}}Success({ data })),
          catchError(error => of(ownActions.load{{Selector}}Failed({ error }))),
        ),
      ),
    ),
  );

  constructor(private readonly _{{selector}}ApiService: {{Selector}}ApiService, private readonly actions$: Actions) {}
}
