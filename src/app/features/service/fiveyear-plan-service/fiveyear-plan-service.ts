import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs-compat/Observable';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class FiveyearPlanService  {
  url = `${environment.baseURL}/ke_hoach_5nam`;
  OrUrl = `${environment.baseURL}/role_v2/danh-sach-con-lien-ke`;
  private _refresh$ = new Subject<void>();
  get refresh$() {
    return this._refresh$;
  }
  constructor(private http: HttpClient) { }

  get(year): Observable<any> {
    let query = `?nam=${year}`;
    return this.http.get<any>(`${this.url}/${query}`);
  }
  getOr(): Observable<any> {
    return this.http.get<any>(`${this.OrUrl}`);
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
