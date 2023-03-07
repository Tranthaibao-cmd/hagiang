import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  chartURL = `${environment.baseURL}/bieu_do`;
  constructor(private http: HttpClient) {}
  private _refresh$ = new Subject<void>();
  get refresh$() {
    return this._refresh$;
  }
  get(): Observable<any> {
    return this.http.get<any>(`${this.chartURL}`);
  }
  getId(id): Observable<any> {
    return this.http.get<any>(`${this.chartURL}/?id=${id}`);
  }
  getList():Observable<any>{
    return this.http.get<any>(`${this.chartURL}/danh_sach`);
  }
  insert(grdp: any): Observable<any> {
    return this.http.post<any>(this.chartURL, grdp).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  update(id, grdp: any): Observable<any> {
    return this.http.put<any>(`${this.chartURL}/${id}`, grdp).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.chartURL}/${id}`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  exportChart(id):Observable<any>{
    return this.http.get<any>(`${this.chartURL}/excel?id=${id}`)
  }
}
