import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class {{Selector}}ApiService {
  constructor(
    private readonly _httpClient: HttpClient,
  ) {}

  load(): Observable<any> {
    return this._httpClient.get<any>(`http://localhost`);
  }
}
