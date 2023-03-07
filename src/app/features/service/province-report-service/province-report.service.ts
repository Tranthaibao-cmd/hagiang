import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProvinceReportService {
  url = `${environment.baseURL}/bao_cao_bang_tinh`;
  constructor(private http: HttpClient) {}
  get(type, period, year, temp, district, branch): Observable<any> {
    let query = `?ky_nhap_lieu=${period}&nam=${year}&loai_bao_cao=${type}`;
    if (temp) {
      query += `&mau_bao_cao=${temp}`;
    }
    if (district) query += `&ma_don_vi_nhap_lieu=${district}`;
    if (branch) query += `&ma_nganh=${branch}`;
    return this.http.get<any>(`${this.url}/bao_cao_bang${query}`);
  }
  PhanHoi(
    type,
    period,
    year,
    temp,
    district,
    branch,
    feedback
  ): Observable<any> {
    let query = `?ky_nhap_lieu=${period}&nam=${year}&loai_bao_cao=${type}`;
    if (temp) {
      query += `&mau_bao_cao=${temp}`;
    }
    if (district) query += `&ma_don_vi_nhap_lieu=${district}`;
    if (branch) query += `&ma_nganh=${branch}`;
    query += `&phan_hoi=${feedback}`;
    return this.http.put<any>(`${this.url}/phan_hoi${query}`, {});
  }
  NopBaoCao(
    type,
    period,
    year,
    temp,
    district,
    branch,
    desc,
    data
  ): Observable<any> {
    let submitted = data.da_nop == 0 ? 1 : 0;
    let query = `?ky_nhap_lieu=${period}&nam=${year}&loai_bao_cao=${type}&da_nop=${submitted}`;
    if (temp) {
      query += `&mau_bao_cao=${temp}`;
    }
    if (district) query += `&ma_don_vi_nhap_lieu=${district}`;
    if (branch) query += `&ma_nganh=${branch}`;
    if (desc) query += `&mo_ta=${desc}`;
    return this.http.post<any>(`${this.url}/nop_bao_cao/${query}`, {
      data: data.data,
      label: data.label,
    });
  }
  DuyetBaoCao(
    type,
    period,
    year,
    temp,
    district,
    branch,
    submitted,
    desc,
    data
  ): Observable<any> {
    let query = `?ky_nhap_lieu=${period}&nam=${year}&loai_bao_cao=${type}&da_duyet=${submitted}`;
    if (temp) {
      query += `&mau_bao_cao=${temp}`;
    }
    if (district) query += `&ma_don_vi_nhap_lieu=${district}`;
    if (branch) query += `&ma_nganh=${branch}`;
    if (desc) query += `&mo_ta=${desc}`;
    return this.http.post<any>(`${this.url}/duyet_bao_cao/${query}`, {
      data: data.data,
      label: data.label,
    });
  }

  HuyDuyetBaoCao(
    type,
    period,
    year,
    temp,
    district,
    branch,
    submitted,
    desc,
    data
  ): Observable<any> {
    let query = `?ky_nhap_lieu=${period}&nam=${year}&loai_bao_cao=${type}&da_duyet=${submitted}`;
    if (temp) {
      query += `&mau_bao_cao=${temp}`;
    }
    if (district) query += `&ma_don_vi_nhap_lieu=${district}`;
    if (branch) query += `&ma_nganh=${branch}`;
    if (desc) query += `&mo_ta=${desc}`;
    return this.http.post<any>(`${this.url}/khong_duyet_bao_cao/${query}`, {
      data: data.data,
      label: data.label,
    });
  }

  SuaBaoCao(
    type,
    period,
    year,
    temp,
    district,
    branch,
    desc,
    data, 
    da_trinh,
  ): Observable<any> {
    let query = `?ky_nhap_lieu=${period}&nam=${year}&loai_bao_cao=${type}`;
    if (temp) {
      query += `&mau_bao_cao=${temp}`;
    }
    if (district) query += `&ma_don_vi_nhap_lieu=${district}`;
    if (branch) query += `&ma_nganh=${branch}`;
    if (desc) query += `&mo_ta=${desc}`;
    if (da_trinh == 0 || da_trinh == 1) query += `&da_trinh=${da_trinh}`;
    return this.http.post<any>(`${this.url}/sua_bao_cao/${query}`, {
      data: data.data,
      label: data.label,
    });
  }
  KhongChapThuan(
    type,
    period,
    year,
    temp,
    district,
    branch
  ): Observable<any> {
    let query = `?ky_nhap_lieu=${period}&nam=${year}&loai_bao_cao=${type}`;
    if (temp) {
      query += `&mau_bao_cao=${temp}`;
    }
    if (district) query += `&ma_don_vi_nhap_lieu=${district}`;
    if (branch) query += `&ma_nganh=${branch}`;
    return this.http.put<any>(`${this.url}/khong_chap_thuan_tinh/${query}`, {});
  }
  ChapThuan(
    type,
    period,
    year,
    temp,
    district,
    branch
  ): Observable<any> {
    let query = `?ky_nhap_lieu=${period}&nam=${year}&loai_bao_cao=${type}`;
    if (temp) {
      query += `&mau_bao_cao=${temp}`;
    }
    if (district) query += `&ma_don_vi_nhap_lieu=${district}`;
    if (branch) query += `&ma_nganh=${branch}`;
    return this.http.put<any>(`${this.url}/khong_chap_thuan_tinh/${query}`, {});
  }
}
