import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { MOODLE_JWT_TOKEN } from '@features/service/authentication-service/constants';
import { IndicatorGroupService } from '@features/service/indicator-group-service/indicator-group.service';
import { IndicatorService } from '@features/service/indicator-service/indicator.service';
import { select } from '@shared/data/select';
import { checkResource } from '@shared/share';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-input-data',
  templateUrl: './input-data.component.html',
  styleUrls: ['./input-data.component.scss'],
})
export class InputDataComponent implements OnInit {
  @ViewChild('typeDrop') typeDrop: DropDownListComponent;
  @ViewChild('periodDrop', { static: true }) periodDrop: DropDownListComponent;
  public search = '';
  public totalPage: any;
  public href;
  public pageSize = 10;
  public height: string = '220px';
  public FileURL =
    'http://upload.aiacademy.edu.vn:6789/static/a3e6cb90e618e8d5103916f8521f3030.xlsx';
  public query = {
    type: '',
  };
  public periodData;
  public yearData = [];
  public fields: Object = { text: 'name', value: 'value' };
  
  public typeData = select.typeData;
  public currentType = 'Thang';

  public currentYear = new Date().getFullYear();
  public currentPeriod;
  branchData: any;
  currentBranch: any;

  user: any
  
  constructor(
    private router: Router,
    private indicatorService: IndicatorService,
    private authService: AuthenticationService,
    private indicatorGroupService: IndicatorGroupService,
    private http: HttpClient,


  ) {
    checkResource('Tài nguyên Nhập liệu', this.authService, this.router);
    this.user = this.authService.User;

    let year = new Date().getFullYear();
    for (let i = 2010; i <= year + 1; i++) {
      this.yearData.unshift(i);
    }
  }
  ngOnInit(): void {
    // this.href = this.router.url.split('?')[0];
    // if (this.href == '/nhap-lieu') {
    //   this.router.navigate(['/nhap-lieu/quy']);
    // }
    this.setPeriodData();
    this.getBranchList();
    // this.setParam();
  }
  getBranchList() {
    this.indicatorGroupService.get().subscribe((result) => {
      this.branchData = result.data[0].data.map((d) => {
        return { name: d.ten_nhom_chi_tieu, value: d.id };
      });
      this.branchData.unshift({
        name: 'Tất cả',
        value: '',
      });
      this.currentBranch = '';
    });
  }
  setPeriodData() {
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
  // setParam() {
  //   this.currentYear =
  //     +this.route.snapshot.queryParamMap.get('year') ||
  //     +new Date().getFullYear();
  //   // if (this.route.snapshot.queryParamMap.get('period') != undefined) {
  //   //   this.currentPeriod = this.route.snapshot.queryParamMap.get('period');
  //   // } else {
  //   //   this.currentPeriod = 'Thang ' + (new Date().getMonth() + 1);
  //   // }
  // }
  onUploadedFile(event) {
    let selectedFile = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('uploaded_file', selectedFile);
    this.indicatorService
      .uploadFile(formData, this.currentPeriod, this.currentYear)
      .subscribe((res) => {});
    Swal.fire({
      icon: 'success',
      title: 'Cập nhật thành công!',
      showConfirmButton: false,
      timer: 2250,
    });
  }
  getDownloadURL() {
    const headers = new HttpHeaders().set(
      'authorization',
      'Bearer ' + localStorage.getItem(MOODLE_JWT_TOKEN)
    );
    this.http
      .post(
        `${environment.baseURL}/nhap_lieu/download-file/?ky_nhap_lieu=${this.currentPeriod}&nam=${this.currentYear}`,
        {}
      )
      .subscribe(
        (response) => {
          window.location.href = response.toString();
        },
        (error) => {}
      );
  }

  change(event, option) {
    if (option == 'year') {
      this.currentYear = event.value;
      this.setPeriodData();
    } else if (option == 'period') {
      this.currentPeriod = event.value ? event.value : this.currentPeriod;
    } else if (option == 'type') {
      this.currentType = event.value;
      this.setPeriodData();
    } else if (option == 'branch') 
      this.currentBranch = event.value;
  }
}
