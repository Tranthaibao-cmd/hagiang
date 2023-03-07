import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { MOODLE_CURRENT_USE } from '@features/service/authentication-service/constants';
import { menuAdmin, menuItems } from './menu';
import 'rxjs/add/operator/map';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { l10n } from './vi';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

setCulture('vi');
L10n.load({
  vi: l10n,
});
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss', '../style/shareStyle.scss'],
})
export class LayoutComponent implements OnInit, OnChanges {
  user: any;
  public selected = false;
  public href;
  public menuItems;
  public title;
  public userName;
  public currentDate;
  show = true;
  myHours: Date | undefined;
  constructor(
    private router: Router,
    private AuthService: AuthenticationService,
    private http: HttpClient
  ) {
    this.AuthService.getUserObservable().subscribe((res) => {
      this.user = res;
    });
    this.getMenu();
    this.menuItems = this.AuthService.Menu;
    
    this.currentDate =
      'Ngày ' +
      new Date().getDate() +
      ' Tháng ' +
      (new Date().getMonth() + 1) +
      ' Năm ' +
      new Date().getFullYear();
  }
  onClickbtn() {}
  ngOnChanges(): void {}
  Toggle() {
    this.show = !this.show;
  }
  ngOnInit(): void {
    this.AuthService.getUserObservable().subscribe((res) => {
      this.title = res?.rolename + ' - ' + res?.ten_day_du;
    });
    this.href = this.router.url.split('?')[0];
    this.checkURL(this.href);
    this.utcTime();
  }
  onClick() {
    this.selected = !this.selected;
  }

  logout() {
    this.AuthService.logout();
  }

  toggleMenu(menu, selected) {
    for (let item of this.menuItems) {
      if (item.mainMenu == menu) {
        
        item.selected = !selected;
        continue;
      } else {
        item.selected = false;
      }
    }
  }
  
  checkURL(url) {
    this.menuItems.forEach((item) => {
      if (item?.subMenu) {
        for (let i of item?.subMenu) {
          if (i.url == url) {
            item.selected = true;
            break;
          } else {
            item.selected = false;
          }
        }
      } else {
        if (item.url == url) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      }
    });
  }
  ClickedOut(event) {
    if (event.target.className === 'dropdown-menu') {
      this.selected = false;
    }
  }
  downloadIntro(){
    this.http.get<any>(`${environment.baseURL}/ke_hoach/tai-lieu-huong-dan`).subscribe(res=> {
      window.location.href = res.toString();
    })
  }
  getMenu() {
    let menu = [];
    if (this.AuthService.User) {
      let resourcesUser = JSON.parse(localStorage.getItem(MOODLE_CURRENT_USE));
      if (this.AuthService.User.rolename != 'Quản trị viên') {
        resourcesUser['quyen_tai_nguyen'].forEach((item) => {
          if (menuItems[item]) {
            menu.push(menuItems[item]);
          } else {
            if (item.includes('Tài nguyên Cấu hình')) {
              let index = menu.findIndex((m) => m.mainMenu == 'Cấu Hình');
              if (index > 0) {
                menu[index].subMenu.push(
                  menuItems['Tài nguyên Cấu hình'].subMenu[item.split(' - ')[1]]
                );
              } else {
                menu.push({
                  mainMenu: 'Cấu Hình',
                  icon: 'icon-cauhinh',
                  selected: false,
                  subMenu: [
                    menuItems['Tài nguyên Cấu hình'].subMenu[
                      item.split(' - ')[1]
                    ],
                  ],
                });
              }
            }
          }
        });
      } else {
        menu = menuAdmin;
      }
    }
    this.menuItems = menu;
    
    this.AuthService.Menu = menu;
  }
  utcTime(): void {
    setInterval(() => {
      //replaced function() by ()=>
      this.myHours = new Date();
    }, 1000);
  }
}
