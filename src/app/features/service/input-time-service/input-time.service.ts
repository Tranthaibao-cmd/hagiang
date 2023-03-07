import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InputTimeService {
  url = `${environment.baseURL}/thoi_gian_nhap_lieu`;
  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) {}
  get refresh$() {
    return this._refresh$;
  }
  get(): Observable<any> {
    return this.http.get<any>(`${this.url}/`);
  }
  update(id, expire_day): Observable<any> {
    return this.http
      .put<any>(`${this.url}/?ma=${id}&expire_day=${expire_day}`, {})
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }
}
