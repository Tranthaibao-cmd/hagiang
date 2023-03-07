import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportHistoryService {
  url = `${environment.baseURL}/lich_su_bao_cao_bang`
  constructor(private http: HttpClient) { }
  get():Observable<any>{
    return this.http.get<any>(`${this.url}?page=1&page_size=1000`)
  }
}
