import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { HistoryService } from '@features/service/history-service/history.service';
import { checkResource } from '@shared/share';
import {
  DataStateChangeEventArgs,
  GridComponent,
} from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-input-history',
  templateUrl: './input-history.component.html',
  styleUrls: ['./input-history.component.scss'],
})
export class InputHistoryComponent implements OnInit {
  @ViewChild('backgroundgrid', { static: true }) backgroundgrid: ElementRef;
  @ViewChild('grid') grid: GridComponent;
  public historyList;
  public toolbar;
  public pageSettings;
  public position;
  public width = 250;
  public periodList = [
    { Name: 'Tháng' },
    { Name: 'Quý' },
    { Name: '6 tháng' },
    { Name: 'Năm' },
  ];

  public unitList;
  constructor(
    private historyService: HistoryService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    checkResource('Tài nguyên Lịch sử nhập liệu', this.authService, this.router);
  }
  ngOnInit(): void {
    this.get();
    this.pageSettings = { pageSize: window.innerWidth > 1366 ? 15 : 10 };
  }
  get() {
    this.historyService.get().subscribe((result) => {
      this.historyList = result.data;
      this.historyList.forEach((item) => {
        item.ngay_tao = this.convertDate(item.ngay_tao);
      });
    });
  }
  convertDate(timestone): String {
    let date = new Date(timestone * 1000);
    let month =
      date.getMonth() < 9 ? '0' + (+date.getMonth() + 1) : +date.getMonth() + 1;
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (
      date.getFullYear() +
      '-' +
      month +
      '-' +
      day +
      ' ' +
      date.toLocaleTimeString()
    );
  }

  dataBound(args) {
    let toolbar;
    this.grid.toolbarModule.getToolbar().childNodes[0].childNodes.forEach(item => {
      if(item['classList'].contains("e-toolbar-left")){
        toolbar = item.childNodes;
      }else if(item['classList'].contains("e-hscroll-bar")){
        toolbar = item.childNodes[0].childNodes[0].childNodes;
      }
    })
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
          element  ['classList'].add('cancel-toolbar-btn');
          break;
      }
    });   if ((this.grid.dataSource as any)?.length === 0) {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'none';
    } else {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'block';
    }
  }
  // public onLoad() {
  //   this.grid.element.addEventListener(
  //     'keydown',
  //     this.debounce((e) => {
  //       if (e.target.getAttribute('id').indexOf('_searchbar') !== -1) {
  //         this.grid.search((e.target as HTMLInputElement).value);
  //       }
  //     }, 0)
  //   );
  // }
  // public debounce = (func, delay) => {
  //   let debounceTimer;
  //   return function () {
  //     const context = this;
  //     const args = arguments;
  //     clearTimeout(debounceTimer);
  //     debounceTimer = setTimeout(() => func.apply(context, args), delay);
  //   };
  // };
}
