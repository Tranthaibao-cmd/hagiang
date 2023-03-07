import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GrdpService {
  grdpURL = `${environment.baseURL}/grdp`;
  constructor(private http: HttpClient) {}
  private _refresh$ = new Subject<void>();
  get refresh$() {
    return this._refresh$;
  }
  getGRDP():Observable<any>{
    return this.http.get<any>(`${this.grdpURL}`);
  }
  getGRDPPhanQuyen():Observable<any>{
    return this.http.get<any>(`${this.grdpURL}/phan_quyen_lay_root`);
  }
  getRoot():Observable<any>{
    return this.http.get<any>(`${this.grdpURL}/root`)
  }
  insert(grdp: any): Observable<any> {
    return this.http.post<any>(this.grdpURL, grdp).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  update(id, grdp: any): Observable<any> {
    return this.http.put<any>(`${this.grdpURL}/${id}`, grdp).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.grdpURL}/${id}?force=true`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
}
