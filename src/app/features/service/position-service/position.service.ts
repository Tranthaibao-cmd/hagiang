import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  positionURL = `${environment.baseURL}/chuc_vu`;
  constructor(private http: HttpClient) {}
  private _refresh$ = new Subject<void>();
  get refresh$() {
    return this._refresh$;
  }
  get():Observable<any>{
    return this.http.get<any>(`${this.positionURL}`);
  }
  getFlat():Observable<any>{
    return this.http.get<any>(`${this.positionURL}/flat`);
  }
  getRoot():Observable<any>{
    return this.http.get<any>(`${this.positionURL}/root`)
  }
  getByRoleId(id):Observable<any>{
    return this.http.get<any>(`${this.positionURL}/roleid?ma_nhom_nguoi_dung=${id}`);
  }
  getDepartment():Observable<any>{
    return this.http.get<any>(`${this.positionURL}/department`)
  }
  getDSPhong(id){
    return this.http.get<any>(`${this.positionURL}/ds_phong/${id}`)
  }
  getDSChucVu(role, district){
    let query =`?roleid=${role}`
    if(district !== undefined && district !== null && district !== '') query = `?roleid=${role}&ma_phong=${district}`;
    return this.http.get<any>(`${this.positionURL}/chuc_vu_cap/${query}`)
  }
  insert(position: any): Observable<any> {
    return this.http.post<any>(this.positionURL, position).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  update(id, position: any): Observable<any> {
    return this.http.put<any>(`${this.positionURL}/${id}`, position).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.positionURL}/${id}?force=true`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
}
