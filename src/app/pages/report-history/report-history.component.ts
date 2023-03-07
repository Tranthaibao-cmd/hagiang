import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { ReportHistoryService } from '@features/service/report-history-service/report-history.service';
import { checkResource } from '@shared/share';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-report-history',
  templateUrl: './report-history.component.html',
  styleUrls: ['./report-history.component.scss'],
})
export class ReportHistoryComponent implements OnInit {
  @ViewChild('grid') grid: GridComponent;
  @ViewChild('treegrid') treegrid: TreeGridComponent;
  @ViewChild('treeDialog') treeDialog: DialogComponent;
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

  public searchSettings;
  public unitList;
  listDetail: any;
  constructor(
    private authService: AuthenticationService,
    private reportHistoryService: ReportHistoryService,
    private router: Router
  ) {
    checkResource('Tài nguyên Lịch sử báo cáo', this.authService, this.router);
  }
  ngOnInit(): void {
    this.get();
    this.searchSettings = { hierarchyMode: 'Child' };
    this.pageSettings = { pageSize: window.innerWidth > 1366 ? 15 : 10 };
  }
  get() {
    this.reportHistoryService.get().subscribe((result) => {
      this.historyList = result.data.map((d) => {
        d.ngay_thuc_hien = this.convertDate(d.ngay_thuc_hien);
        return d;
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
  open(data) {
    this.listDetail = data;
    this.treeDialog.show();
  }
  close() {
    this.listDetail = undefined;
    this.treeDialog.hide();
  }
  dataBound(args) {
    if ((this.grid.dataSource as any)?.length === 0) {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'none';
    } else {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'block';
    }
  }

  public onLoadTree() {
    this.treegrid.element.addEventListener(
      'keydown',
      this.debounce((e) => {
        if (e.target.getAttribute('id')?.indexOf('_searchbar') !== -1) {
          this.treegrid.search((e.target as HTMLInputElement).value);
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
  dataBoundTree(args) {
    if ((this.treegrid.dataSource as any)?.length === 0) {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'none';
    } else {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'block';
    }
  }
}
