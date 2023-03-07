import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IndicatorMeasureService {
  chiTieuURL = `${environment.baseURL}/chi_tieu`;
  constructor(private http: HttpClient) {}
  private _refresh$ = new Subject<void>();
  public data;
  get refresh$() {
    return this._refresh$;
  }
  getInputItems():Observable<any>{
    return this.http.get<any>(`${this.chiTieuURL}/all`)
  }
  getIndicators(ma_chi_tieu, page, size, nam, indi): Observable<any> {
    let query = '';
    if(indi) query = `&ten_loai_ct=${indi}`
    if (ma_chi_tieu)
      return this.http.get<any>(
        `${this.chiTieuURL}/?ma_chi_tieu=${ma_chi_tieu}&page=${page}&page_size=${size}`
      );
    else if (nam)
      return this.http.get<any>(
        `${this.chiTieuURL}/?nam=${nam}&page=${page}&page_size=${size}${query}`
      );
    else
      return this.http.get<any>(
        `${this.chiTieuURL}/?page=${page}&page_size=${size}`
      );
  }
  getAdministrativeUnits(): Observable<any> {
    return this.http.get<any>(`${this.chiTieuURL}/get_dv_giao`);
  }

  insert(indicator: any): Observable<any> {
    return this.http.post<any>(this.chiTieuURL, indicator).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  update(ma_chi_tieu, chi_tieu: any): Observable<any> {
    delete chi_tieu.ma_chi_tieu;
    return this.http
      .put<any>(`${this.chiTieuURL}/${ma_chi_tieu}`, chi_tieu)
      .pipe(tap(() => this._refresh$.next()));
  }
  delete(ma_chi_tieu): Observable<any> {
    return this.http
      .delete<any>(`${this.chiTieuURL}/${ma_chi_tieu}?force=true`)
      .pipe(tap(() => this._refresh$.next()));
  }
}
