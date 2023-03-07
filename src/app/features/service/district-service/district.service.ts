import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DistrictService {
  url = `${environment.baseURL}/phong`;
  constructor(private http: HttpClient) {}
  private _refresh$ = new Subject<void>();
  get refresh$() {
    return this._refresh$;
  }
  get(): Observable<any> {
    return this.http.get<any>(`${this.url}`);
  }
  getPhongThuocHuyen(): Observable<any> {
    return this.http.get<any>(`${this.url}/phong_thuoc_huyen/`);
  }
  getPhongThuocHuyenCT(): Observable<any> {
    return this.http.get<any>(`${this.url}/phong_thuoc_huyen_ct/`);
  }
  insert(name, state): Observable<any> {
    return this.http
      .post<any>(`${this.url}`, { ten_phong: name, trang_thai: state })
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }
  update(id, name): Observable<any> {
    return this.http.put(`${this.url}/${id}`, { ten_phong: name }).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  delete(id): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
}
