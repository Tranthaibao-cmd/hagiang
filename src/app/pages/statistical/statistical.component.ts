import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { ChartService } from '@features/service/chart-service/chart.service';
import { IndicatorService } from '@features/service/indicator-service/indicator.service';
import { StatisticalService } from '@features/service/statistical-service/statistical.service';
import { select } from '@shared/data/select';
import { checkResource } from '@shared/share';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss'],
})
export class StatisticalComponent implements OnInit {
  @ViewChild('typeDrop') typeDrop: DropDownListComponent;
  @ViewChild('periodDrop', { static: true }) periodDrop: DropDownListComponent;
  public href;
  public chartName = '';
  public data_id;
  public height: string = '220px';
  public typeData = select.typeData;
  public periodData;
  public yearData = [];
  public currentType = 'Thang';
  public currentYear = new Date().getFullYear();
  public currentPeriod;
  public fields: Object = { text: 'name', value: 'value' };

  public reload = Math.random();
  gridData: any[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private chartService: ChartService,
    private statisticalService: StatisticalService
  ) {
    console.log(this.currentYear);
    checkResource('Tài nguyên Thống kê', this.authService, this.router);
    let year = new Date().getFullYear();
    for (let i = 2010; i <= year + 1; i++) {
      this.yearData.unshift(i);
    }
  }

  ngOnInit(): void {
    // this.href = this.router.url.split('?')[0];
    // this.periodData = select.monthData;
    // this.setParams();
    this.setPeriodData();
  }
  setParams() {
    if (this.route.snapshot.queryParamMap.get('year') != undefined) {
      this.currentYear = +this.route.snapshot.queryParamMap.get('year');
    } else {
      this.currentYear = +new Date().getFullYear();
      if (this.href.includes('nam')) {
        this.currentYear = this.currentYear - 1;
      }
    }
    if (this.route.snapshot.queryParamMap.get('period') != undefined) {
      this.currentPeriod = this.route.snapshot.queryParamMap.get('period');
    } else {
      this.currentPeriod = 'Thang ' + (new Date().getMonth() + 1);
    }
  }
  setPeriodData() {
    console.log(this.currentType);
    switch (this.currentType) {
      case 'Thang':
        this.periodData = select.monthData;
        this.periodDrop.enabled = true;
        this.currentPeriod = 'Thang ' + (new Date().getMonth() + 1);
        break;
      case 'Quy':
        this.periodData = select.quarterData;
        this.periodDrop.enabled = true;
        this.currentPeriod =
          'Quy ' + Math.ceil((new Date().getMonth() + 1) / 3);
        break;
      case '6 thang':
        this.periodData = select.haftData;
        this.periodDrop.enabled = true;
        let haft = Math.ceil((new Date().getMonth() + 1) / 6);
        if (haft == 1) this.currentPeriod = select.haftData[0].value;
        else if (haft == 2) this.currentPeriod = select.haftData[1].value;
        break;
      case '9 thang':
        this.currentPeriod = this.currentType;
      case 'Nam':
        this.currentPeriod = this.currentType;
      default:
        this.periodDrop.text = null;
        this.periodDrop.enabled = false;
        this.periodData = undefined;
    }
    console.log(this.currentPeriod);
  }
  change(e, type) {
    if (type == 'period') {
      if (e.value) this.currentPeriod = e.value;
    } else if (type == 'year') {
      this.currentYear = e.value;
    } else if (type == 'type') {
      this.currentType = e.value;
      this.setPeriodData();
    }
    // this.router.navigate([this.href], {
    //   queryParams: { period: this.currentPeriod, year: this.currentYear },
    // });
  }
  onClickChart(e) {
    console.log(e);
    this.data_id = e;
    this.getGridData(e);
  }
  onSelectChart(e) {
    console.log(e);
    this.data_id = e;
    this.getGridData(e);
  }
  getGridData(id) {
    this.gridData = [];
    if (typeof id == 'object') {
      this.statisticalService
        .getChart(id, undefined, undefined, undefined)
        .subscribe((result) => {
          result.data.forEach((item) => {
            item.chartdata.forEach((i) => {
              this.gridData.push({
                name: item.ten_chi_tieu,
                gia_tri: i.gia_tri,
                ngay_nhap_lieu: i.ngay_nhap_lieu,
              });
            });
          });
        });
    } else {
      this.chartService.getId(id).subscribe((result) => {
        result[0].data.forEach((item) => {
          item.chartdata.forEach((i) => {
            this.gridData.push({
              name: item.ten_chi_tieu,
              gia_tri: i.gia_tri,
              ngay_nhap_lieu: i.ngay_nhap_lieu,
            });
          });
        });
      });
    }
    // data.forEach((item) => {
    //   item.chartdata.forEach((i) => {
    //     this.gridData.push({
    //       name: item.ten_chi_tieu,
    //       gia_tri: i.gia_tri,
    //       ngay_nhap_lieu: i.ngay_nhap_lieu,
    //     });
    //   });
    // });
  }
}
