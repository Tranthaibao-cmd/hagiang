import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  reportURL = `${environment.baseURL}/bao_cao`;
  reportTableUrl = `${environment.baseURL}/bao_cao_bang`;
  constructor(private http: HttpClient) {}
  // private _refresh$ = new Subject<void>();
  // get refresh$() {
  //   return this._refresh$;
  // }
  get(): Observable<any> {
    return this.http.get<any>(`${this.reportURL}`);
  }
  getId(id): Observable<any> {
    return this.http.get<any>(`${this.reportURL}?id=${id}`);
  }
  getList(): Observable<any> {
    return this.http.get<any>(`${this.reportURL}/get_list`);
  }
  getReportTable(
    year,
    period,
    branch,
    office,
    template,
    type,
    level
  ): Observable<any> {
    let str = `?nam=${year}&ky_nhap_lieu=${period}&loai_bao_cao=${type}`;
    if (branch) {
      str += `&ma_nganh=${branch}`;
      // if (level == 2 && type == 'Phong thuoc huyen tong hop')
      //   str += `&co_quan_nhan=${branch}`;
      // else str += `&ma_nganh=${branch}`;
    }
    if (office) {
      str += `&co_quan_nhan=${office}`;
    }
    if (type == 'Xa tong hop' && template)
      str += `&ma_don_vi_nhap_lieu=${template}`;
    else if (type != 'Xa tong hop' && template)
      str += `&mau_bao_cao=${template}`;
    return this.http.get<any>(`${this.reportTableUrl}/bao_cao_bang${str}`);
  }
  trinh_bao_cao(
    year,
    period,
    commune,
    type,
    branch,
    data,
    office,
    submitted,
    selectedLeader
  ) {
    let str = `?nam=${year}&ky_nhap_lieu=${period}&loai_bao_cao=${type}`;
    if (submitted == 0) {
      str += `&da_trinh=${submitted}`;
    } else if (submitted == 1 && selectedLeader)
      str += `&da_trinh=${submitted}&lanh_dao_duyet=${selectedLeader}`;
    if (data?.mo_ta) str += `&mo_ta=${data?.mo_ta}`;
    if (branch) str += `&ma_nganh=${branch}`;
    if (office) str += `&co_quan_nhan=${office}`;
    if (type == 'Xa tong hop' && commune)
      str += `&ma_don_vi_nhap_lieu=${commune}`;
    else str += `&mau_bao_cao=${commune}`;
    return this.http.post<any>(`${this.reportTableUrl}/sua_bao_cao/${str}`, {
      data: data.data,
      label: data.label,
    });
  }
  KhongChapThuan(year, period, commune, type, branch, feedback) {
    let str = `nam=${year}&ky_nhap_lieu=${period}&loai_bao_cao=${type}&phan_hoi=${feedback}`;
    if (branch) str += `&ma_nganh=${branch}`;
    if (commune) str += `&ma_don_vi_nhap_lieu=${commune}`;
    else str += `&mau_bao_cao=${commune}`;
    return this.http.put<any>(
      `${this.reportTableUrl}/khong_chap_thuan?${str}`,
      {}
    );
  }
  ChapThuan(year, period, commune, type, branch) {
    let str = '';
    if (branch) str += `&ma_nganh=${branch}`;
    if (commune) {
      if (type == 'Xa tong hop') str += `&ma_don_vi_nhap_lieu=${commune}`;
      else str += `&mau_bao_cao=${commune}`;
    }
    return this.http.put<any>(
      `${this.reportTableUrl}/chap_thuan?nam=${year}&ky_nhap_lieu=${period}&loai_bao_cao=${type}${str}`,
      {}
    );
  }
  getLanhDao() {
    return this.http.get<any>(`${this.reportTableUrl}/ds_lanh_dao_trinh`);
  }
  getBaoCaoTinh(year, period, id) {
    let str = `?nam=${year}&ky_nhap_lieu=${period}`;
    if (id) str += `&ma_cap_so=${id}`;
    return this.http.get<any>(`${this.reportTableUrl}/bao_cao_tinh/${str}`);
  }
  getBaoCaoTinhDinhKy(year, period, id) {
    let str = `?nam=${year}&ky_nhap_lieu=${period}`;
    if (id) str += `&ma_cap_so=${id}`;
    return this.http.get<any>(
      `${this.reportTableUrl}/bao_cao_tinh_dinh_ky/${str}`
    );
  }
  insert(report: any): Observable<any> {
    return this.http.post<any>(this.reportURL, report);
  }
  insertReportTable(
    year,
    period,
    commune,
    type,
    branch,
    desc,
    data,
    office
  ): Observable<any> {
    let str = '';
    if (branch) str += `&ma_nganh=${branch}`;
    if (office && type == 'Phong thuoc huyen tong hop')
      str += `&co_quan_nhan=${office}`;
    if (type == 'Xa tong hop' && commune)
      str += `&ma_don_vi_nhap_lieu=${commune}`;
    else str += `&mau_bao_cao=${commune}`;
    return this.http.post<any>(
      `${this.reportTableUrl}/nop_bao_cao/?nam=${year}&ky_nhap_lieu=${period}&loai_bao_cao=${type}${str}&mo_ta=${desc}&da_nop=${1}`,
      { data: data.data, label: data.label }
    );
  }

  huyNopReportTable(
    year,
    period,
    commune,
    type,
    branch,
    desc,
    data,
    office
  ): Observable<any> {
    let str = '';
    if (branch) str += `&ma_nganh=${branch}`;
    if (office && type == 'Phong thuoc huyen tong hop')
      str += `&co_quan_nhan=${office}`;
    if (type == 'Xa tong hop' && commune)
      str += `&ma_don_vi_nhap_lieu=${commune}`;
    else str += `&mau_bao_cao=${commune}`;
    return this.http.post<any>(
      `${this.reportTableUrl}/nop_bao_cao/?nam=${year}&ky_nhap_lieu=${period}&loai_bao_cao=${type}${str}&mo_ta=${desc}&da_nop=${0}`,
      { data: data.data, label: data.label }
    );
  }

  updateFeedback(year, period, commune, type, branch, feedback) {
    let str = '';
    if (branch) str += `&ma_nganh=${branch}`;
    if (type == 'Xa tong hop' && commune)
      str += `&ma_don_vi_nhap_lieu=${commune}`;
    else str += `&mau_bao_cao=${commune}`;
    return this.http.put<any>(
      `${this.reportTableUrl}/phan_hoi?nam=${year}&ky_nhap_lieu=${period}&loai_bao_cao=${type}${str}&phan_hoi=${feedback}`,
      {}
    );
  }
  update(id, report: any): Observable<any> {
    delete report.ma_nhom_nguoi_dung;
    return this.http.put<any>(`${this.reportURL}/${id}`, report);
  }
  updateRole(id, role): Observable<any> {
    return this.http.put<any>(`${this.reportURL}/?ma_bao_cao=${id}`, role);
  }
  updateDuyet(year, period, commune, type, branch, office, data) {
    let str = '';
    if (branch) str += `&ma_nganh=${branch}`;
    if (office && type == 'Phong thuoc huyen tong hop')
      str += `&co_quan_nhan=${office}`;
    if (type == 'Xa tong hop' && commune)
      str += `&ma_don_vi_nhap_lieu=${commune}`;
    else str += `&mau_bao_cao=${commune}`;
    return this.http.post<any>(
      `${this.reportTableUrl}/duyet_bao_cao/?nam=${year}&ky_nhap_lieu=${period}&loai_bao_cao=${type}&da_duyet=${status}${str}`,
      { data: data.data, label: data.label }
    );
  }
  HuyDuyet(year, period, commune, type, branch, office, data, feedback) {
    let str = `nam=${year}&ky_nhap_lieu=${period}&loai_bao_cao=${type}&phan_hoi=${feedback}`;
    if (branch) str += `&ma_nganh=${branch}`;
    if (office && type == 'Phong thuoc huyen tong hop')
      str += `&co_quan_nhan=${office}`;
    if (type == 'Xa tong hop' && commune)
      str += `&ma_don_vi_nhap_lieu=${commune}`;
    else str += `&mau_bao_cao=${commune}`;
    return this.http.post<any>(
      `${this.reportTableUrl}/khong_duyet_bao_cao/?${str}`,
      { data: data.data, label: data.label }
    );
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.reportURL}/${id}`);
  }
}
