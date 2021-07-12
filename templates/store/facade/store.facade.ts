import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { load{{Selector}} } from '../actions/{{selector}}.actions';
import { select{{Selector}} } from '../selectors/{{selector}}.selector';
import { {{Selector}}State } from '../type/{{selector}}-state.type';

@Injectable({
  providedIn: 'root',
})
export class {{Selector}}FacadeService {
  readonly {{selector}}$ = new BehaviorSubject<any | undefined>(undefined);

  constructor(private readonly _store: Store<{{Selector}}State>) {
    this._store.pipe(select(select{{Selector}})).subscribe(this.{{selector}}$);
  }

  load(): void {
    this._store.dispatch(load{{Selector}}());
  }
}
