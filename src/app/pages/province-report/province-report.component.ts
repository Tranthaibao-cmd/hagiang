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
            this.message = 'Cấp dưới chưa nộp báo cáo';
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
            this.message = 'Cấp dưới chưa nộp báo cáo';
          }
        );
    }
  }
  format_label(text) {
    // console.log('dfff', text, text.replace('dau', 'đầu').replace('cuoi', 'cuối'))
    return text.replace('dau', 'đầu').replace('cuoi', 'cuối')
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
    // Nộp báo cáo
  }
  save() {
    this.insertReportTable();
  }
  downloadFile(reportData) {
    let data_file = {
      data: reportData.data,
      drop_fields: ['ma_chi_tieu', 'ma_hien_thi'],
      rename_fields: {
        ghi_chu: 'Ghi chú',
        ten_chi_tieu: 'Chỉ tiêu',
        ten_don_vi: 'Đơn vị',
      },
      header_list: [
        {
          cell: 'A2:J2',
          text: `BIỂU KẾT QUẢ THỰC HIỆN CÁC CHỈ TIÊU PHÁT TRIỂN KT-XH NĂM ${this.selectedYear}`,
          format: {
            bold: 1,
            align: 'center',
            valign: 'vcenter',
            font_name: 'Times New Roman',
          },
        },
        {
          cell: 'A3:J3',
          text: `(Kèm theo Báo cáo số: /BC-UBND ngày tháng năm ${this.selectedYear} của ${this.user.rolename})`,
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
      (data?.phan_hoi.toLowerCase().includes('chưa nộp báo cáo') ||
        data?.phan_hoi == '')
    ) {
      return 'Nộp báo cáo';
    }
    return 'Nộp lại báo cáo';
  }
  public feedback = async () => {
    this.dialogClose();
  };
  public dlgButtons = [
    {
      click: this.feedback.bind(this),
      buttonModel: { content: 'Gửi', isPrimary: true },
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
