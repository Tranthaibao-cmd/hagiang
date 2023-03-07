import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs-compat/Observable';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  url = `${environment.baseURL}/ke_hoach`;
  OrUrl = `${environment.baseURL}/role_v2/danh-sach-con-lien-ke`;
  private _refresh$ = new Subject<void>();
  get refresh$() {
    return this._refresh$;
  }
  constructor(private http: HttpClient) {}
  get(year, branch, organ): Observable<any> {
    let query = `?nam=${year}`;
    if (branch) {
      query += `&nganh=${branch}`;
    }
    if (organ) {
      query += `&ma_co_quan_cung_cap=${organ}`;
    }
    return this.http.get<any>(`${this.url}/${query}`);
  }
  getValue(ten_chi_tieu): Observable<any> {
    return this.http.get<any>(`${this.url}/${ten_chi_tieu}`);
  }
  getOr(): Observable<any> {
    return this.http.get<any>(`${this.OrUrl}`);
  }
  getCap1(): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}/role_v2/danh-sach-cap1`);
  }
  getDSCoQuanCungCap(year): Observable<any> {
    return this.http.get<any>(`${this.url}/ds_co_quan_cung_cap/?nam=${year}`);
  }
  insert(plan): Observable<any> {
    delete plan.id;
    return this.http
      .post<any>(`${this.url}`, plan)
      .pipe(tap(() => this._refresh$.next()));
  }
  delete(id): Observable<any> {
    return this.http
      .delete<any>(`${this.url}/${id}`)
      .pipe(tap(() => this._refresh$.next()));
  }
}
