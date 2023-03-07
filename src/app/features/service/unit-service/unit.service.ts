import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  unitURL = `${environment.baseURL}/don_vi_tinh`;
  constructor(private http: HttpClient) {}
  private _refresh$ = new Subject<void>();
  get refresh$() {
    return this._refresh$;
  }
  get(): Observable<any> {
    return this.http.get<any>(
      `${this.unitURL}/?page_size=1000&page_num=1`
    );
  }
  insert(unit): Observable<any> {
    return this.http.post<any>(`${this.unitURL}`, unit).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  update(id, unit): Observable<any> {
    return this.http.put<any>(`${this.unitURL}/${id}`, unit).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  delete(id): Observable<any> {
    return this.http.delete<any>(`${this.unitURL}/${id}?force=true`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
}
