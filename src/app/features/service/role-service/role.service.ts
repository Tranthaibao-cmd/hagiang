import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  roleURL = `${environment.baseURL}/role_v2`;
  constructor(private http: HttpClient) {}
  private _refresh$ = new Subject<void>();
  get refresh$() {
    return this._refresh$;
  }
  getRole():Observable<any>{
    return this.http.get<any>(`${this.roleURL}/?page=1&page_num=1000`);
  }
  getRoleList():Observable<any>{
    return this.http.get<any>(`${this.roleURL}/root?page=1&page_num=1000`)
  }
  getRoleListV2():Observable<any>{
    return this.http.get<any>(`${this.roleURL}/danh-sach`)
  }
  getAll():Observable<any>{
    return this.http.get<any>(`${this.roleURL}/flat-all`)
  }
  getDanhSachSo():Observable<any>{
    return this.http.get<any>(`${this.roleURL}/danh-sach-so`)
  }
  getShareReport():Observable<any>{
    return this.http.get<any>(`${this.roleURL}/share-bao-cao`)
  }
  insert(role: any): Observable<any> {
    return this.http.post<any>(this.roleURL, role).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  update(id, role: any): Observable<any> {
    return this.http.put<any>(`${this.roleURL}/${id}`, role).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.roleURL}/${id}?force=true`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
}
