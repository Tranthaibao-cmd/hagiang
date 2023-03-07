import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { GrdpService } from '@features/service/grdp-service/grdp.service';
import { select } from '@shared/data/select';
import { checkResource } from '@shared/share';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TooltipComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-input-grdp',
  templateUrl: './input-grdp.component.html',
  styleUrls: ['./input-grdp.component.scss'],
})
export class InputGrdpComponent implements OnInit {
  @ViewChild('tooltip') tooltip: TooltipComponent;
  @ViewChild('itemTemplate') temp;
  @ViewChild('backgroundgrid', {static: true}) backgroundgrid: ElementRef;
  public search = '';
  public totalPage: any;
  public href;
  public downloadURL = `${environment.baseURL}/nhap_lieu_dau_vao/download-file/`;
  public uploadURL = `${environment.baseURL}/nhap_lieu_dau_vao/uploadfile/`;
  public query = {
    type: '',
  };
  public height: string = '220px';
  public typeData = [];
  public periodData = select.haftData;
  public yearData = [];
  public fields: Object = { text: 'name', value: 'value' };
  public currentYear;
  public currentPeriod;
  public currentType;
  public close = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private grdpService: GrdpService,
    private authService: AuthenticationService,
    private http: HttpClient
  ) {
    checkResource('Tài nguyên Nhập liệu', this.authService, this.router);
    let year = new Date().getFullYear()
    for (let i = 2010; i <= year + 1; i++) {
      this.yearData.unshift(i);
    }
  }
  ngOnInit(): void {
    this.href = this.router.url.split('?')[0];
    this.setParam();
  }
  setParam() {
    let date = new Date();
    var param = this.route.snapshot.queryParamMap;
    this.getGRDP();
    this.currentYear = +param.get('year') || +date.getFullYear();
    this.currentPeriod =
      param.get('period') || +date.getMonth > 6
        ? '6 thang cuoi'
        : '6 thang dau';
    if (param.get('type')) {
      this.currentType = param.get('type');
    }
  }
  getGRDP() {
    this.grdpService.getGRDPPhanQuyen().subscribe((result) => {
      result.forEach((item) => {
        this.typeData.push({ name: item.ten, value: item.id });
      });
      if (!this.currentType) {
        this.currentType = result[0].id;
      }
    });
  }
  public onClose(args) {
    this.tooltip.close();
  }
  onBeforeOpen(args, tooltip) {
    this.tooltip = tooltip;
  }
  change(event, option) {
    if (option == 'period') {
      this.currentPeriod = event.value;
    } else if (option == 'year') {
      this.currentYear = event.value;
    } else if (option == 'type') {
      this.currentType = event.value;
    }
    this.router.navigate([this.href], {
      queryParams: {
        period: this.currentPeriod,
        year: this.currentYear,
        type: this.currentType,
      },
    });
  }
  onUploadedFile(event) {
    let selectedFile = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('uploaded_file', selectedFile);
    this.http
      .post<any>(
        `${this.uploadURL}?ky_nhap_lieu=${this.currentPeriod}&nam=${this.currentYear}&id_cay_nhap_lieu=${this.currentType}`,
        formData,
        {
          reportProgress: true,
          observe: 'events',
        }
      )
      .subscribe((result) => {
        if (result['status'] == 200) {
        }
      });
  }
  getDownloadURL() {
    this.http
      .post(
        `${this.downloadURL}?ky_nhap_lieu=${this.currentPeriod}&nam=${this.currentYear}&id_cay_nhap_lieu=${this.currentType}`,
        {}
      )
      .subscribe(
        (response) => {
          window.location.href = response.toString();
        },
        (error) => {}
      );
  }
  public onFiltering: EmitType<FilteringEventArgs> = (
    e: FilteringEventArgs
  ) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query =
      e.text !== '' ? query.where('name', 'startswith', e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.typeData, query);
  };
}
