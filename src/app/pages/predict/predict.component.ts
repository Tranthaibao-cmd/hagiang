import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { IndicatorService } from '@features/service/indicator-service/indicator.service';
import { select } from '@shared/data/select';
import { checkResource } from '@shared/share';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss'],
})
export class PredictComponent implements OnInit {
  // @ViewChild('backgroundgrid', {static: true}) backgroundgrid: ElementRef;
  @ViewChild('periodDrop', { static: true }) periodDrop: DropDownListComponent;

  public href;
  public chartName = '';
  public data;
  public periodData;
  public height: string = '220px';
  public yearData = [];
  public currentYear;
  public currentPeriod;
  public fields: Object = { text: 'name', value: 'value' };

  public reload = Math.random();
  public periodNumberData = [1, 2, 3, 4, 5];
  public currentPeriodNumber = 1;
  gridData: any[];

  public typeData = select.typeData;
  public currentType = 'Thang';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private indiService: IndicatorService,
    private authService: AuthenticationService
  ) {
    checkResource('Tài nguyên Dự báo', this.authService, this.router);
    let year = new Date().getFullYear();
    for (let i = 2010; i <= year + 1; i++) {
      this.yearData.unshift(i);
    }
  }

  ngOnInit(): void {
    this.href = this.router.url.split('?')[0];
    this.periodData = select.monthData;
    this.setParams();
  }
  setParams() {
    if (this.route.snapshot.queryParamMap.get('year') != undefined)
      this.currentYear = +this.route.snapshot.queryParamMap.get('year');
    else this.currentYear = +new Date().getFullYear();
    if (this.href.includes('nam')) this.currentYear = this.currentYear - 1;

    if (this.route.snapshot.queryParamMap.get('period') != undefined)
      this.currentPeriod = this.route.snapshot.queryParamMap.get('period');
    else this.currentPeriod = 'Thang ' + (new Date().getMonth() + 1);

    if (this.route.snapshot.queryParamMap.get('periodNumber') != undefined)
      this.currentPeriodNumber =
        +this.route.snapshot.queryParamMap.get('periodNumber');
    else this.currentPeriodNumber = 1;
  }

  setPeriodData() {
    console.log(this.currentType)

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
  }

  change(e, type) {
    if (type == 'period') this.currentPeriod = e.value ? e.value : this.currentPeriod;
    else if (type == 'year') this.currentYear = e.value;
    else if (type == 'periodNumber') this.currentPeriodNumber = e.value;
    else if (type == 'type') {
      this.currentType = e.value;
      this.setPeriodData()
    }
    // console.log('currentPeriod 2', type, this.currentPeriod)
    this.router.navigate([this.href], {
      queryParams: {
        period: this.currentPeriod,
        year: this.currentYear,
        periodNumber: this.currentPeriodNumber,
      },
    });
  }
  
  onClickChart(e) {
    this.chartName = '';
    this.data = [];
    this.data = e;
    this.getGridData(e);
  }
  reloadData() {
    this.indiService
      .nhapLieuCalculate(this.currentYear, '123')
      .subscribe((result) => {
        this.reload = Math.random();
      });
  }
  onSelectChart(e) {
    this.data = [];
    this.data = e.data;
    this.chartName = e.name;
    console.log(this.data)
    this.getGridData(e.data.data);
    
  }

  getGridData(data) {
    console.log('sss', data)

    this.gridData = [];
    if (data != undefined) {
      data.forEach((item) => {
        console.log('item', item)
        // item.chartdata.forEach((i) => {
        //   this.gridData.push({
        //     name: item.ten_chi_tieu,
        //     gia_tri: i.gia_tri,
        //     ngay_nhap_lieu: i.ngay_nhap_lieu,
        //   });
        // });
      });
    }
      
  }
}
