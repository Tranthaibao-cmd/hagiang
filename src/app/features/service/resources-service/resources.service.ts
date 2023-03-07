import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  resourcesURL = `${environment.baseURL}/tai_nguyen`;
  adminURL = `${environment.baseURL}/phan_quyen_quan_tri`;
  admin_v2URL = `${environment.baseURL}/phan_quyen_quan_tri_v2`;
  private resourcesSubject = new BehaviorSubject(null);
  private user = this.resourcesSubject.asObservable();

  public set Resources(resourcesData: any) {
    this.resourcesSubject.next(resourcesData);
  }
  public get Resources(): any {
    return this.resourcesSubject.value;
  }

  constructor(private http: HttpClient) {}

  private _refresh$ = new Subject<void>();
  get refresh$() {
    return this._refresh$;
  }
  get(): Observable<any> {
    return this.http.get<any>(this.resourcesURL);
  }
  insert(resources: any): Observable<any> {
    return this.http.post<any>(this.resourcesURL, resources).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  update(id, resources: any): Observable<any> {
    return this.http.put<any>(`${this.resourcesURL}/${id}`, resources).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.resourcesURL}/${id}?force=true`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  getUserRole(username): Observable<any> {
    return this.http.get<any>(
      `${this.adminURL}?ten_nguoi_dung=${username}`
    );
  }
  updateUserRole(role): Observable<any> {
    return this.http
      .post<any>(
        `${this.adminURL}/?ten_nguoi_dung=${role.ten_nguoi_dung}&ten_tai_nguyen=${role.ten_tai_nguyen}&co_quyen=${role.co_quyen}`,
        {}
      )
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }
  getUserRoleV2(ma_chuc_vu): Observable<any> {
    return this.http.get<any>(
      `${this.admin_v2URL}/?ma_chuc_vu=${ma_chuc_vu}`
    );
  }
  updateUserRoleV2(role): Observable<any> {
    return this.http
      .post<any>(
        `${this.admin_v2URL}/?ma_chuc_vu=${role.ma_chuc_vu}&ten_tai_nguyen=${role.ten_tai_nguyen}&co_quyen=${role.co_quyen}`,
        {}
      )
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }
  updateAllUserRoleV2(id, checked): Observable<any> {
    return this.http
      .post<any>(
        `${this.admin_v2URL}/upsert_all?ma_chuc_vu=${id}&all=${checked}`,
        {}
      )
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }
}
