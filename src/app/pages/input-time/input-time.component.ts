import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { InputTimeService } from '@features/service/input-time-service/input-time.service';
import { checkResource } from '@shared/share';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.scss'],
})
export class InputTimeComponent implements OnInit {
  inputTimeList: any;
  @ViewChild('grid') grid: GridComponent;
  public yearData = [];
  public indiYearList;
  public userGroupList;
  public currentYear = new Date().getFullYear();
  public changedList = [];
  public pageSettings;
  public toolbar;
  public searchSettings;
  public dateList = Array.from({ length: 31 }, (_, i) => i + 1);
  public mode = 'CheckBox';
  public filterPlaceholder = 'Tìm kiếm';
  public user;
  constructor(
    private inputTimeService: InputTimeService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    checkResource(
      'Tài nguyên Thời gian nhập liệu',
      this.authService,
      this.router
    );
  }

  ngOnInit(): void {
    this.inputTimeService.refresh$.subscribe(() => {
      this.get();
    });
    this.get();
    this.toolbar = ['Search'];
    var screenWidth = window.innerWidth;
    this.pageSettings = { pageSize: screenWidth > 1366 ? 15 : 10 };
  }
  get() {
    this.inputTimeService.get().subscribe((result) => {
      this.inputTimeList = result;
    });
  }
  change(e, id) {
    this.inputTimeService.update(id, e.value).subscribe(
      (result) => {
        if (result?.status == 401) {
          console.log('a');
          Swal.fire({
            icon: 'error',
            title: result?.msg ? result?.msg : 'Cập nhật không thành công!',
            timer: 3000,
            showConfirmButton: true,
          });
        } else {
          console.log('b');
          Swal.fire({
            icon: 'success',
            title: 'Cập nhật thành công!',
            timer: 3000,
            showConfirmButton: true,
          });
        }
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Cập nhật không thành công!',
          timer: 3000,
          showConfirmButton: true,
        });
      }
    );
  }
  public onLoad() {
    this.grid.element.addEventListener(
      'keydown',
      this.debounce((e) => {
        if (e.target.getAttribute('id')?.indexOf('_searchbar') > -1) {
          this.grid.search((e.target as HTMLInputElement).value);
        }
      }, 0)
    );
  }
  public debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  dataBound(args) {
    let toolbar;
    this.grid.toolbarModule
      .getToolbar()
      .childNodes[0].childNodes.forEach((item) => {
        if (item['classList'].contains('e-toolbar-left')) {
          toolbar = item.childNodes;
        } else if (item['classList'].contains('e-hscroll-bar')) {
          toolbar = item.childNodes[0].childNodes[0].childNodes;
        }
      });
    toolbar.forEach((item) => {
      let element = item.childNodes[0];
      switch (element['innerText']) {
        case 'Thêm mới':
          element['classList'].add('add-toolbar-btn');
          break;
        case 'Sửa':
          element['classList'].add('edit-toolbar-btn');
          break;
        case 'Xóa':
          element['classList'].add('delete-toolbar-btn');
          break;
        case 'Lưu':
          element['classList'].add('save-toolbar-btn');
          break;
        case 'Hủy':
          element['classList'].add('cancel-toolbar-btn');
          break;
      }
    });
    if ((this.grid.dataSource as any)?.length === 0) {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'none';
    } else {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'block';
    }
  }
}
