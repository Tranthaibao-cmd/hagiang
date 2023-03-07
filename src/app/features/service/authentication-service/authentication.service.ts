import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserIn } from './model/UserIn';
import { MOODLE_CURRENT_USE, MOODLE_JWT_TOKEN } from './constants';
import { menuTemp } from './menu';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnDestroy {
  EXPIRE_TOKEN_TIME: number = 0;
  private userSubject = new BehaviorSubject(null);
  private user = this.userSubject.asObservable();
  private menuSubject = new BehaviorSubject(null);
  private menu = this.menuSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {}
  ngOnDestroy() {}

  public set User(userData: any) {
    this.userSubject.next(userData);
    localStorage.setItem(MOODLE_CURRENT_USE, JSON.stringify(userData));
  }

  public get User(): any {
    return this.userSubject.value;
  }

  public getUserObservable() {
    return this.user;
  }

  public set Menu(menuData: any) {
    this.menuSubject.next(menuData);
  }

  public get Menu(): any {
    return this.menuSubject.value;
  }

  login(username: string, password: string) {
    const userIn: UserIn = { username: username, password: password };
    const path = `${environment.baseURL}/token`;
    let contentHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    // console.log('userIn', userIn, encodeURIComponent(userIn.password))
    return this.http
      .post<any>(
        path,
        `username=${userIn.username}&password=${userIn.password}`,
        { headers: contentHeader }
      )
      .pipe(
        map((data) => {
          let menu = [];
          menuTemp.forEach((i) => {
            // console.log('Check', i, data.data.quyen_tai_nguyen.includes(i))
            if (data.data.quyen_tai_nguyen.includes(i)) {
              menu.push(i)
            }
          });
          // console.log('menu', menu)
          data.data.quyen_tai_nguyen = menu;
          this.userSubject.next(data.data);
          localStorage.setItem(MOODLE_CURRENT_USE, JSON.stringify(data.data));
          localStorage.setItem(
            MOODLE_JWT_TOKEN,
            JSON.stringify(data.access_token)
          );
          return data.data;
        })
      );
  }

  logout() {
    // this.stopRefreshTokenTimer()
    this.userSubject.next(null);
    localStorage.removeItem(MOODLE_CURRENT_USE);
    localStorage.removeItem(MOODLE_JWT_TOKEN);
    this.router.navigateByUrl('/login');
  }
}
