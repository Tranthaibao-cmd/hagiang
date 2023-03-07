import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { ProvinceReportService } from '@features/service/province-report-service/province-report.service';
import { ReportService } from '@features/service/report-service/report.service';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { list } from './list';

@Component({
  selector: 'app-high-report',
  templateUrl: './high-report.component.html',
  styleUrls: ['./high-report.component.scss'],
})
export class HighReportComponent implements OnInit {
  public tabList;
  public selectedTab = 'Huyen tong hop';
  public selectedLevel = 1;

  public yearList = [];
  public periodList = list.periodList;
  public tempList = list.ds_mau_bao_cao;
  public districtList;
  public branchList;
  public selectedPeriod = 'Thang ' + (new Date().getMonth() + 1);
  public selectedYear = new Date().getFullYear();
  public selectedTemp = list.ds_mau_bao_cao[0].value;
  public selectedDistrict;
  public selectedBranch;

  public fields = list.fields;

  public listReport;

  @ViewChild('Dialog') dialog: DialogComponent;

  public user;
  public message;
  public submitTitle;
  check = true;
  public feedbackContent = '';
  @ViewChild('treegrid') treegrid: TreeGridComponent;
  reportTableList: any;
  pageSettings: { pageSize: number };

  constructor(
    private provinceReportService: ProvinceReportService,
    private authenService: AuthenticationService,
    private http: HttpClient
  ) {
    let currentDate = new Date().getFullYear();
    for (let i = 2010; i <= currentDate + 1; i++) {
      this.yearList.push(i);
    }
    this.user = this.authenService.User;
    if (this.user.cap === '6') {
      this.tabList = list.tabList.slice(0, 2);
    } else if (['7', '8', '9'].includes(this.user.cap)) {
      this.tabList = list.tabList;
    }
  }

  ngOnInit() {
    this.getTempList();
    this.getDistrictList();
    this.getBranchList();
    this.getData();
    var screenWidth = window.innerWidth;
    this.pageSettings = { pageSize: screenWidth > 1366 ? 15 : 10 };
  }
  getTabName() {
    return this.tabList.find((t) => t.value == this.selectedTab).name;
  }
  getTempList() {
    this.tempList = list.ds_mau_bao_cao;
    this.selectedTemp = list.ds_mau_bao_cao[0].value;
  }
  async getDistrictList() {
    this.districtList = [];
    await this.http
      .get<any>(`${environment.baseURL}/role_v2/danh-sach-huyen`)
      .toPromise()
      .then(async (res) => {
        this.selectedDistrict = await res[0]?._id;
        res.forEach((item) => {
          this.districtList.push({ name: item.ten, value: item._id });
        });
      });
  }
  async getBranchList() {
    this.branchList = [];
    await this.http
      .get<any>(`${environment.baseURL}/role_v2/danh-sach-nganh-tinh`)
      .toPromise()
      .then(async (res) => {
        this.selectedBranch = await res[0]?._id;
        res.forEach((item) => {
          this.branchList.push({ name: item.ten, value: item._id });
        });
      });
  }
  format_label(text) {
    // console.log('dfff', text, text.replace('dau', 'đầu').replace('cuoi', 'cuối'))
    return text.replace('dau', 'đầu').replace('cuoi', 'cuối')
  }
  getReportTableList(temp, district, branch) {
    this.reportTableList = undefined;
    this.provinceReportService
      .get(
        this.selectedTab,
        this.selectedPeriod,
        this.selectedYear,
        temp,
        district,
        branch
      )
      .subscribe(
        (result) => {
          this.message = undefined;
          this.reportTableList = result;
          if (result?.data.length > 0) this.check = false;
          else this.check = true;
          // if (this.user.cap == this.selectedLevel) {
          if (this.selectedTab == 'So tong hop') {
            if (
              ['6', '7'].includes(this.user.cap) &&
              this.selectedBranch == this.user.roleid &&
              !this.user.ten_chuc_vu.toLowerCase().includes('lãnh đạo')
            ) {
              if (result.da_trinh == 0 && result.da_duyet == 0 && result.da_nop == 0 && result.chap_thuan == 0)
                this.submitTitle = 'Trình cấp trên';
              else if (result.da_trinh == 1 && result.da_duyet == 0 && result.da_nop == 0 && result.chap_thuan == 0)
                this.submitTitle = 'Hủy trình';
              else if (result.da_trinh == 1 && result.da_duyet == 1 && result.da_nop == 0 && result.chap_thuan == 0)
                this.submitTitle = 'Nộp báo cáo';
              else if (result.da_trinh == 1 && result.da_duyet == 1 && result.da_nop == 1 ) //&& result.chap_thuan == 0
                this.submitTitle = 'Hủy nộp';
            } else if (
              ['6', '7'].includes(this.user.cap) &&
              this.selectedBranch == this.user.roleid &&
              this.user.ten_chuc_vu.toLowerCase().includes('lãnh đạo')
            ) {
              if (result.da_duyet == 0 && result.data?.length > 0)
                this.submitTitle = 'Duyệt';
              else if (result.da_duyet == 1) this.submitTitle = 'Đã duyệt';
            } else this.submitTitle = undefined;
          } else if (this.selectedTab == 'Tong hop bao cao') {
            if (['7'].includes(this.user.cap)) {
              this.submitTitle = 'Nộp báo cáo';
              if (result.da_nop == 1 ) {
                this.submitTitle = 'Hủy nộp';
              }

            } else this.submitTitle = undefined;
          } else if (this.selectedTab == 'Huyen tong hop') {
            if (
              ['6', '7'].includes(this.user.cap) &&
              this.selectedBranch == this.user.roleid &&
              result.da_duyet == 1 &&
              result.da_nop == 1
            )
              this.submitTitle = 'Không chấp thuận';
            else this.submitTitle = undefined;
          }
          // } else this.submitTitle = undefined;
        },
        (error) => {
          this.message = 'Cấp dưới chưa nộp báo cáo';
        }
      );
  }
  insertReportTable() {
    this.provinceReportService
      .NopBaoCao(
        this.selectedTab,
        this.selectedPeriod,
        this.selectedYear,
        this.selectedTemp,
        this.selectedDistrict,
        this.selectedBranch,
        this.reportTableList.mo_ta,
        this.reportTableList
      )
      .subscribe(
        (_) => {
          Swal.fire({
            icon: 'success',
            title: 'Đã nộp báo cáo!',
            showConfirmButton: false,
            timer: 2250,
          });
          this.getData();
        },
        (err) => {
          this.getData();
        }
      );
  }
  change(e, type) {
    if (type == 'ky') this.selectedPeriod = e.value;
    else if (type == 'nam') this.selectedYear = e.value;
    else if (type == 'mau_bao_cao') this.selectedTemp = e.value;
    else if (type == 'huyen') this.selectedDistrict = e.value;
    else if (type == 'nganh') this.selectedBranch = e.value;
    this.getData();
  }
  getData() {
    switch (this.selectedTab) {
      case 'Huyen tong hop':
        if (
          (this.selectedPeriod,
          this.selectedYear,
          this.selectedTemp,
          this.selectedDistrict,
          this.selectedBranch)
        )
          this.getReportTableList(
            this.selectedTemp,
            this.selectedDistrict,
            this.selectedBranch
          );
        break;
      case 'So tong hop':
        if (
          (this.selectedPeriod,
          this.selectedYear,
          this.selectedTemp,
          this.selectedBranch)
        )
          this.getReportTableList(
            this.selectedTemp,
            undefined,
            this.selectedBranch
          );
        break;
      case 'Tong hop bao cao':
        if ((this.selectedPeriod, this.selectedYear))
          this.getReportTableList(undefined, undefined, undefined);
        break;
    }
  }

  save() {
    if (this.submitTitle == 'Trình cấp trên') {
      this.provinceReportService
        .SuaBaoCao(
          this.selectedTab,
          this.selectedPeriod,
          this.selectedYear,
          this.selectedTemp,
          this.selectedDistrict,
          this.selectedBranch,
          this.reportTableList.mo_ta,
          this.reportTableList, 
          1
        )
        .subscribe(
          (_) => {
            Swal.fire({
              icon: 'success',
              title: 'Đã trình cấp trên!',
              showConfirmButton: false,
              timer: 2250,
            });
            this.getData();
          },
          (err) => {
            this.getData();
          }
        );
    } else if (this.submitTitle == 'Hủy trình') {
      this.provinceReportService
        .SuaBaoCao(
          this.selectedTab,
          this.selectedPeriod,
          this.selectedYear,
          this.selectedTemp,
          this.selectedDistrict,
          this.selectedBranch,
          this.reportTableList.mo_ta,
          this.reportTableList, 
          0,
        )
        .subscribe(
          (_) => {
            Swal.fire({
              icon: 'success',
              title: 'Đã hủy trình!',
              showConfirmButton: false,
              timer: 2250,
            });
            this.getData();
          },
          (err) => {
            this.getData();
          }
        );
    } else if (this.submitTitle == 'Duyệt') {
      this.provinceReportService
        .DuyetBaoCao(
          this.selectedTab,
          this.selectedPeriod,
          this.selectedYear,
          this.selectedTemp,
          this.selectedDistrict,
          this.selectedBranch,
          1,
          this.reportTableList.mo_ta,
          this.reportTableList
        )
        .subscribe(
          (_) => {
            Swal.fire({
              icon: 'success',
              title: 'Đã duyệt!',
              showConfirmButton: false,
              timer: 2250,
            });
            this.getData();
          },
          (error) => {
            this.getData();
          }
        );
    } else if (this.submitTitle == 'Đã duyệt') {
      this.provinceReportService
        .DuyetBaoCao(
          this.selectedTab,
          this.selectedPeriod,
          this.selectedYear,
          this.selectedTemp,
          this.selectedDistrict,
          this.selectedBranch,
          0,
          this.reportTableList.mo_ta,
          this.reportTableList
        )
        .subscribe(
          (_) => {
            Swal.fire({
              icon: 'success',
              title: 'Đã hủy!',
              showConfirmButton: false,
              timer: 2250,
            });
            this.getData();
          },
          (error) => {
            this.getData();
          }
        );
    } else if (this.submitTitle == 'Nộp báo cáo') this.insertReportTable();
    else if (this.submitTitle == 'Hủy nộp') this.insertReportTable();
    else if (this.submitTitle == 'Không chấp thuận')
      this.provinceReportService
        .KhongChapThuan(
          this.selectedTab,
          this.selectedPeriod,
          this.selectedYear,
          this.selectedTemp,
          this.selectedDistrict,
          this.selectedBranch
        )
        .subscribe(
          (_) => {
            Swal.fire({
              icon: 'success',
              title: 'Đã hủy báo cáo!',
              showConfirmButton: false,
              timer: 2250,
            });
            this.getData();
          },
          (error) => {
            this.getData();
          }
        );
  }
  accept() {
    this.provinceReportService
      .ChapThuan(
        this.selectedTab,
        this.selectedPeriod,
        this.selectedYear,
        this.selectedTemp,
        this.selectedDistrict,
        this.selectedBranch
      )
      .subscribe(
        (_) => {
          Swal.fire({
            icon: 'success',
            title: 'Đã chấp thuận!',
            showConfirmButton: false,
            timer: 2250,
          });
          this.getData();
        },
        (error) => {
          this.getData();
        }
      );
  }
  dialogOpen() {
    this.feedbackContent = '';
    this.dialog.show();
  }
  dialogClose() {
    this.dialog.hide();
    this.getData();
  }
  public feedback = () => {
    this.provinceReportService
      .PhanHoi(
        this.selectedTab,
        this.selectedPeriod,
        this.selectedYear,
        this.selectedTemp,
        this.selectedDistrict,
        this.selectedBranch,
        this.feedbackContent
      )
      .subscribe((result) => {
        Swal.fire({
          icon: 'success',
          title: 'Phản hồi thành công!',
          showConfirmButton: false,
          timer: 2250,
        });
      });
    this.dialogClose();
  };
  public dlgButtons = [
    {
      click: this.feedback.bind(this),
      buttonModel: { content: 'Gửi', isPrimary: true },
    },
  ];
  async changeReport(e, data, field) {
    let arrayList = await this.getArray(data).reverse();
    let arrIndex = await this.getIndexArr(this.reportTableList.data, arrayList);
    this.changeData(this.reportTableList.data, field, e, arrIndex);
  }
  changeData(data, key, value, arr) {
    if (arr[0].children?.length > 0) {
      this.changeData(data[arr[0].index].children, key, value, arr[0].children);
    } else {
      data[arr[0].index][key] =
        key == 'ghi_chu' ? value.target.value : parseFloat(value.target.value);
    }
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
  async onClick(value) {
    if (this.selectedTab != value) {
      this.selectedTab = value;
      this.selectedLevel = this.tabList.findIndex((x) => x.value == value) + 1;
      this.tempList = this.districtList = this.branchList = undefined;
      this.selectedTemp = this.selectedDistrict = this.selectedBranch = null;
      this.selectedYear = new Date().getFullYear();
      this.selectedPeriod = 'Thang ' + (new Date().getMonth() + 1);
      this.message = undefined;
      if (value == 'Huyen tong hop') {
        this.getTempList();
        await this.getDistrictList();
        await this.getBranchList();
      } else if (value == 'So tong hop') {
        this.getTempList();
        await this.getBranchList();
      } else if (value == 'Tong hop bao cao') {
      }
      this.getData();
    }
  }
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
  created(e) {}
  public focusIn(target: HTMLElement): void {
    target.parentElement.classList.add('e-input-focus');
  }
  public focusOut(target: HTMLElement): void {
    target.parentElement.classList.remove('e-input-focus');
  }
}
