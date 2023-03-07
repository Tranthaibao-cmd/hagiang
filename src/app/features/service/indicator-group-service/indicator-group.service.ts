import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IndicatorGroupService {
  private IGURL = `${environment.baseURL}/nhom_chi_tieu`;
  constructor(private http: HttpClient) {}
  private _refresh$ = new Subject<void>();
  get refresh$() {
    return this._refresh$;
  }
  public get(): Observable<any> {
    return this.http.get<any>(`${this.IGURL}/?page_size=1000&page_num=1`);
  }
  public insert(IG): Observable<any> {
    return this.http.post<any>(`${this.IGURL}/`, IG).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  public update(id, IG): Observable<any> {
    return this.http.put<any>(`${this.IGURL}/${id}`, IG).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  public delete(id): Observable<any> {
    return this.http
      .delete<any>(`${this.IGURL}/${id}?force=true`)
      .pipe(tap(() => this._refresh$.next()));
  }
}
