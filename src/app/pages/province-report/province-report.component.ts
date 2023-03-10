import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { ReportService } from '@features/service/report-service/report.service';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { environment } from 'src/environments/environment';
import { list } from './list';

@Component({
  selector: 'app-province-report',
  templateUrl: './province-report.component.html',
  styleUrls: ['./province-report.component.scss'],
})
export class ProvinceReportComponent implements OnInit {
  @ViewChild('Dialog') dialog: DialogComponent;
  @ViewChild('treegrid') treegrid: TreeGridComponent;
  public tabList = list.tabList;
  public selectedTab = 'Bao cao theo huyen';
  public periodList = list.periodList;
  public yearList = [];
  public baseList;
  public fields = list.fields;
  public selectedPeriod = 'Thang ' + (new Date().getMonth() + 1);
  public selectedYear = new Date().getFullYear();
  public selectedBase;
  public reportTableList;
  public message;
  public feedbackContent = '';
  public pageSettings: { pageSize: number };
  check: boolean;
  public user;
  constructor(private reportService: ReportService, private http: HttpClient,
    private authenService: AuthenticationService) {
    let currentDate = new Date().getFullYear();
    for (let i = 2010; i <= currentDate + 1; i++) {
      this.yearList.push(i);
    }
    this.user = this.authenService.User;
  }

  async ngOnInit() {
    await this.getBase();
    this.getReportTableList();
    var screenWidth = window.innerWidth;
    this.pageSettings = { pageSize: screenWidth > 1366 ? 15 : 10 };
  }

  async onClick(value) {
    if (this.selectedTab != value) {
      this.selectedTab = value;
      this.selectedYear = new Date().getFullYear();
      this.selectedPeriod = 'Thang ' + (new Date().getMonth() + 1);
      this.selectedBase = this.baseList[0]?.value;
      this.message = undefined;
    }
    this.getReportTableList();
  }
  change(e, type) {
    if (type == 'ky') this.selectedPeriod = e.value;
    else if (type == 'nam') this.selectedYear = e.value;
    else if (type == 'ma_cap_so') this.selectedBase = e.value;
    this.getReportTableList();
  }
  async changeReport(e, data, field) {
    let arrayList = await this.getArray(data).reverse();
    let arrIndex = await this.getIndexArr(this.reportTableList.data, arrayList);
    this.changeData(this.reportTableList.data, field, e, arrIndex);
  }
  getArray(data) {
    if (data.parentItem) {
      return [data.ma_chi_tieu].concat(this.getArray(data.parentItem));
    } else {
      return [data.ma_chi_tieu];
    }
  }
  getIndexArr(data, arr) {
    if (arr.length > 1) {
      let index = data.findIndex((d) => d.ma_chi_tieu == arr[0]);
      arr.shift();
      return [
        { index: index, children: this.getIndexArr(data[index].children, arr) },
      ];
    } else if (arr.length == 1) {
      let index = data.findIndex((d) => d.ma_chi_tieu == arr[0]);
      arr.shift();
      return [{ index: index, children: [] }];
    }
  }
  changeData(data, key, value, arr) {
    if (arr[0].children?.length > 0) {
      this.changeData(data[arr[0].index].children, key, value, arr[0].children);
    } else {
      data[arr[0].index][key] =
        key == 'ghi_chu' ? value.target.value : parseFloat(value.value);
    }
  }

  public focusIn(target: HTMLElement): void {
    target.parentElement.classList.add('e-input-focus');
  }
  public focusOut(target: HTMLElement): void {
    target.parentElement.classList.remove('e-input-focus');
  }
  getReportTableList() {
    this.reportTableList = undefined;
    if (this.selectedTab == 'Bao cao theo huyen') {
      this.reportService
        .getBaoCaoTinh(
          this.selectedYear,
          this.selectedPeriod,
          this.selectedBase
        )
        .subscribe(
          (result) => {
            this.message = undefined;
            this.reportTableList = result;
            if (result?.data.length > 0) this.check = false;
            else this.check = true;
          },
          (error) => {
            this.message = 'C???p d?????i ch??a n???p b??o c??o';
          }
        );
    } else if (this.selectedTab == 'Bao cao dinh ky') {
      this.reportService
        .getBaoCaoTinhDinhKy(
          this.selectedYear,
          this.selectedPeriod,
          this.selectedBase
        )
        .subscribe(
          (result) => {
            this.message = undefined;
            this.reportTableList = result;
            
            if (result?.data.length > 0) this.check = false;
            else this.check = true;
          },
          (error) => {
            this.message = 'C???p d?????i ch??a n???p b??o c??o';
          }
        );
    }
  }
  format_label(text) {
    // console.log('dfff', text, text.replace('dau', '?????u').replace('cuoi', 'cu???i'))
    return text.replace('dau', '?????u').replace('cuoi', 'cu???i')
  }

  async getBase() {
    this.baseList = [];
    const result = await this.http
      .get<any>(`${environment.baseURL}/role_v2/danh-sach-so`)
      .toPromise();
    result.forEach((item) => {
      this.baseList.push({ name: item.ten, value: item._id });
    });
    this.selectedBase = result[0]?._id;
  }
  insertReportTable() {
    // N???p b??o c??o
  }
  save() {
    this.insertReportTable();
  }
  downloadFile(reportData) {
    let data_file = {
      data: reportData.data,
      drop_fields: ['ma_chi_tieu', 'ma_hien_thi'],
      rename_fields: {
        ghi_chu: 'Ghi ch??',
        ten_chi_tieu: 'Ch??? ti??u',
        ten_don_vi: '????n v???',
      },
      header_list: [
        {
          cell: 'A2:J2',
          text: `BI???U K????T QUA?? TH????C HI????N C??C CH??? TI??U PH??T TRI???N KT-XH N??M ${this.selectedYear}`,
          format: {
            bold: 1,
            align: 'center',
            valign: 'vcenter',
            font_name: 'Times New Roman',
          },
        },
        {
          cell: 'A3:J3',
          text: `(K??m theo Ba??o ca??o s???: /BC-UBND ng??y th??ng n??m ${this.selectedYear} c???a ${this.user.rolename})`,
          format: {
            italic: 1,
            align: 'center',
            valign: 'vcenter',
            font_name: 'Times New Roman',
          },
        },
      ],
      footer_list: [
        {
          text: reportData.phan_hoi,
          format: {
            text_wrap: true,
            italic: 1,
            align: 'center',
            valign: 'vcenter',
            font_name: 'Times New Roman',
          },
        },
      ],
    };
    this.http
      .post<any>(`${environment.baseURL}/xuat_bao_cao_excel`, data_file)
      .subscribe((result) => {
        window.location.href = result;
      });
  }
  dialogOpen() {
    this.feedbackContent = '';
    this.dialog.show();
  }
  dialogClose() {
    this.feedbackContent = '';
    this.dialog.hide();
    this.getReportTableList();
  }
  getTitle(data): String {
    if (
      data?.phan_hoi != undefined &&
      (data?.phan_hoi.toLowerCase().includes('ch??a n???p b??o c??o') ||
        data?.phan_hoi == '')
    ) {
      return 'N???p b??o c??o';
    }
    return 'N???p l???i b??o c??o';
  }
  public feedback = async () => {
    this.dialogClose();
  };
  public dlgButtons = [
    {
      click: this.feedback.bind(this),
      buttonModel: { content: 'G???i', isPrimary: true },
    },
  ];
  public onLoad() {
    this.treegrid.element.addEventListener(
      'keydown',
      this.debounce((e) => {
        if (e.target.getAttribute('id')) {
          if (e.target.getAttribute('id').indexOf('_searchbar') !== -1) {
            this.treegrid.search((e.target as HTMLInputElement).value);
          }
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
  created(e) {
    // this.grid.toolbarModule.toolbar.items.forEach((e) => {
    //   e.tooltipText = '';
    // });
  }
}
