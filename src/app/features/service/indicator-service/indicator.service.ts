import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IndicatorService {
  chiTieuURL = `${environment.baseURL}/chi_tieu_dau_vao`;
  nhapLieuURL = `${environment.baseURL}/nhap_lieu_dau_vao`;
  NLURL = `${environment.baseURL}/nhap_lieu`;
  GCTURL = `${environment.baseURL}/giao_chi_tieu`;
  constructor(private http: HttpClient) {}
  private _refresh$ = new Subject<void>();
  get refresh$() {
    return this._refresh$;
  }
  getIndicator(num, size): Observable<any> {
    return this.http.get<any>(
      `${this.chiTieuURL}/?page=${num}&page_size=${size}`
    );
  }
  getAllIndicator(year): Observable<any> {
    return this.http.get<any>(`${this.chiTieuURL}/dau_vao_ctn/${year}`);
  }
  getId(name): Observable<any> {
    return this.http.get<any>(
      `${this.chiTieuURL}/?ten_dau_vao=${name}&page=1&page_size=1`
    );
  }
  getDSCT(id): Observable<any> {
    return this.http.get<any>(`${this.NLURL}/ds_ct_theo_cap?user_id=${id}`);
  }
  updateDSCT(username, data): Observable<any> {
    return this.http.put<any>(
      `${this.NLURL}/giao_chi_tieu_can_bo?user_name=${username}`,
      data
    );
  }
  getGCT(username): Observable<any> {
    return this.http.get<any>(
      `${this.GCTURL}/giao_chi_tieu_quan_ly?user_name=${username}`
    );
  }
  updateGCT(username, data): Observable<any> {
    return this.http.put<any>(
      `${this.GCTURL}/giao_chi_tieu_quan_ly?user_name=${username}`,
      data
    );
  }
  insert(indi: any): Observable<any> {
    return this.http.post<any>(this.chiTieuURL, indi).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  update(id, chi_tieu: any): Observable<any> {
    return this.http.put<any>(`${this.chiTieuURL}/${id}`, chi_tieu).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.chiTieuURL}/${id}?force=true`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  getNhapLieu(data) {
    let query = `${this.NLURL}?ky_nhap_lieu=${data.ky_nhap_lieu}&nam=${data.nam}`;
    if (data?.id_cay_nhap_lieu)
      query += `&id_cay_nhap_lieu=${data.id_cay_nhap_lieu}`;
    if (data?.nhom_nganh) query += `&nhom_nganh=${data.nhom_nganh}`;
    return this.http.get<any>(query);
  }
  updateNhapLieu(data) {
    let param = `?ma_chi_tieu=${data.ma_chi_tieu}&gia_tri=${data.gia_tri}&ky_nhap_lieu=${data.ky_nhap_lieu}&nam=${data.nam}&mo_ta=${data.mo_ta}&uoc_tinh=${data.uoc_tinh}&gia_tri_so_bo=${data.gia_tri_so_bo}`;
    // if (data?.id_cay_nhap_lieu)
    //   param += `&id_cay_nhap_lieu=${data.id_cay_nhap_lieu}`;
    return this.http.get<any>(`${this.NLURL}/upsert${param}`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  uploadFile(formData, period, year) {
    return this.http
      .post<any>(
        `${environment.baseURL}/nhap_lieu/uploadfile/?ky_nhap_lieu=${period}&nam=${year}`,
        formData,
        {
          reportProgress: true,
          observe: 'events',
        }
      )
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }
  nhapLieuCalculate(nam, ma_nhom_nguoi_dung) {
    return this.http.get<any>(
      `${this.NLURL}/calculate?nam=${nam}&ma_nhom_nguoi_dung=${ma_nhom_nguoi_dung}`
    );
  }

  getEstimateChart(period, year, periodNumber, chartList): Observable<any> {
    return this.http.post<any>(
      `${this.NLURL}/uoc-thuc-hien?nam=${year}&ky_nhap_lieu=${period}&so_ky=${periodNumber}`,
      chartList
    );
  }
}
