import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { loadDimensions } from '../actions/dimensions.actions';
import { selectDimensions } from '../selectors/dimensions.selector';
import { DimensionsState } from '../type/dimensions-state.type';

@Injectable({
  providedIn: 'root',
})
export class DimensionsFacadeService {
  readonly dimensions$ = new BehaviorSubject<any | undefined>(undefined);

  constructor(private readonly _store: Store<DimensionsState>) {
    this._store.pipe(select(selectDimensions)).subscribe(this.dimensions$);
  }

  load(): void {
    this._store.dispatch(loadDimensions());
  }
}
