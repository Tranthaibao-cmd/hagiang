import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class StatisticalService {
  statisticalURL = `${environment.baseURL}/gia_tri_chi_tieu`;
  thongKeURL = `${environment.baseURL}/nhap_lieu/thong-ke`;
  xuatbaocaoURL = `${environment.baseURL}/xuat_bao_cao_word`;
  constructor(private http: HttpClient) {}
  getStatistical(year, period): Observable<any> {
    return this.http.get<any>(
      `${this.thongKeURL}/?nam=${year}&ky_nhap_lieu=${period}&page_num=1&page_size=1000`
    );
  }
  updateStatistical(data): Observable<any> {
    let uoc_tinh = data?.uoc_tinh || 0;
    return this.http.post<any>(
      `${this.statisticalURL}/cap-nhat?ma_chi_tieu=${data.ma_chi_tieu}&nam=${data.nam}&ky_nhap_lieu=${data.ky_nhap_lieu}&gia_tri=${data.gia_tri}&uoc_tinh=${uoc_tinh}`,
      {}
    );
  }
  getChart(chartList, from, to, tach): Observable<any> {
    let query = '';
    console.log(from, to, tach)
    if(from && to){
      query = `?ngay_bat_dau=${from}&ngay_ket_thuc=${to}&tach_nam=${tach}`
    }
    return this.http.post<any>(`${this.statisticalURL}/chart-data${query}`, chartList);
  }
  getPeriodChart(id, year): Observable<any> {
    let y = year.split('-');
    return this.http.post<any>(
      `${this.statisticalURL}/bieu_do_cung_ki?ma_chi_tieu=${id}&ngay_bat_dau=${
        '01-01-' + y[0]
      }&ngay_ket_thuc=${'01-01-' + y[1]}`,
      {}
    );
  }
  getStatisticalChart(id): Observable<any> {
    return this.http.post<any>(`${this.statisticalURL}/bieu_do_ke_hoach`, [id]);
  }
  getBaoCao(nam, ky): Observable<any> {
    return this.http.get<any>(
      `${this.statisticalURL}/bao-cao?nam=${nam}&ky_nhap_lieu=${ky}`
    );
  }
  getBaoCaoDinhKy(nam, ky): Observable<any> {
    return this.http.get<any>(
      `${this.statisticalURL}/bao_cao_dinh_ky?nam=${nam}&ky_nhap_lieu=${ky}`
    );
  }
  downloadReport(data): Observable<any> {
    return this.http.post<any>(`${this.xuatbaocaoURL}/bao_cao_tong_hop`, {
      data: data,
    });
  }
}
