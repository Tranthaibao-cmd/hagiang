import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IndicatorYearService {
  url = `${environment.baseURL}/chi_tieu`;
  constructor(private http: HttpClient) {}
  get(nam): Observable<any> {
    return this.http.get<any>(`${this.url}/chi_tieu_nam/?nam=${nam}`);
  }
  insert(ma_chi_tieu, nam, nhom_nguoi_dung) {
    return this.http.put<any>(
      `${this.url}/cap_nhat_nnd/${ma_chi_tieu}?nam=${nam}`,
      { ma_nhom_nguoi_dung: nhom_nguoi_dung }
    );
  }
  insertQuantity(ma_chi_tieu, nam, tt) {
    return this.http.post<any>(
      `${this.url}/upsert_ctn/?ma_chi_tieu=${ma_chi_tieu}&nam=${nam}`,
      { tt_ctn: tt }
    );
  }
}
