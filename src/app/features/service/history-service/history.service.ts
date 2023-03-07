import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  historyURL = `${environment.baseURL}/lich_su_nhap_lieu`
  constructor(private http: HttpClient) { }
  get():Observable<any>{
    return this.http.get<any>(this.historyURL)
  }
}
