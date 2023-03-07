import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userURL = `${environment.baseURL}/user`;
  infoURL = `${environment.baseURL}/cap_nhat_tt_nguoi_dung`;
  resetPassURL = `${environment.baseURL}/reset_password`;
  phanQuyenNhapLieuURL = `${environment.baseURL}/phan_quyen_nhap_lieu`;
  constructor(private http: HttpClient) {}
  private _refresh$ = new Subject<void>();
  get refresh$() {
    return this._refresh$;
  }
  getUsers(size, num): Observable<any> {
    return this.http.get<any>(
      `${this.userURL}/?page_size=${size}&page_num=${num}`
    );
  }
  insert(user): Observable<any> {
    return this.http.post<any>(`${this.userURL}`, user).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  update(id, user): Observable<any> {
    return this.http.put<any>(`${this.userURL}/${id}`, user).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  delete(id): Observable<any> {
    return this.http.delete<any>(`${this.userURL}/${id}?force=true`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  changePassword(pass): Observable<any> {
    return this.http.put<any>(`${this.userURL}`, pass);
  }
  updateInfo(info): Observable<any> {
    return this.http.put<any>(`${this.infoURL}`, info).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  getUserRole(username): Observable<any> {
    return this.http.get<any>(
      `${this.phanQuyenNhapLieuURL}?ten_nguoi_dung=${username}`
    );
  }
  updateUserRole(role): Observable<any> {
    return this.http
      .post<any>(
        `${this.phanQuyenNhapLieuURL}/?ten_nguoi_dung=${role.ten_nguoi_dung}&ma_dau_vao=${role.ma_dau_vao}&ma_quyen=${role.ma_quyen}`,
        {}
      )
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }
  resetPassword(id): Observable<any> {
    return this.http.put<any>(`${this.resetPassURL}/${id}`, {});
  }
  active(id, status): Observable<any> {
    return this.http
      .put<any>(`${this.userURL}/block_user/?id=${id}&is_block=${status}`, {})
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }
}
