import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { ReportService } from '@features/service/report-service/report.service';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { list } from './list';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import Swal from 'sweetalert2';
import { ShareFunctionService } from '@features/service/share-function-service/share-function.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  @ViewChild('start')
  public startObj: DropDownListComponent;
  @ViewChild('end')
  public endObj: DropDownListComponent;
  @ViewChild('InputDialog') InputDialog: DialogComponent;
  @ViewChild('officeDropdown') officeDropdown: DropDownListComponent;
  @ViewChild('chooseLeaderDrop') chooseLeaderDrop: DropDownListComponent;
  @ViewChild('Editor')
  public editor: RichTextEditorComponent;
  @ViewChild('Dialog') dialog: DialogComponent;
  @ViewChild('chooseLeader') chooseLeader: DialogComponent;
  @ViewChild('backgroundgrid', { static: true }) backgroundgrid: ElementRef;
  public checkDate = false;
  public yearList = [];
  public periodList = list.periodList;
  public tabList;
  public startList = list.startList;
  public dropdownList;
  public branchList;
  public fields = list.fields;
  public showList = false;
  public listReport;
  public selectedPeriod = 'Thang ' + (new Date().getMonth() + 1);
  public selectedYear = new Date().getFullYear();
  public selectedTemplateReport;
  public selectedBranch;
  public officeList;
  public selectedOffice;
  public dropdownTitle = 'X??';
  public selectedTab = 'Xa tong hop';
  public selectedLevel = 1;
  public user;
  public message;
  public submitTitle;
  public cancelTitle;
  check = true;
  public feedbackContent = '';
  @ViewChild('treegrid') treegrid: TreeGridComponent;
  reportTableList: any;
  pageSettings: { pageSize: number };
  endList: any;
  leaderList: any;
  selectedLeader: any = undefined;

  constructor(
    private reportService: ReportService,
    private authenService: AuthenticationService,
    private http: HttpClient,
    private shareService: ShareFunctionService
  ) {
    let currentDate = new Date().getFullYear();
    for (let i = 2010; i <= currentDate + 1; i++) {
      this.yearList.unshift(i);
    }
    this.authenService.getUserObservable().subscribe((res) => {
      this.user = res;
    });
    this.tabList = list.tabList.slice(0, this.user.cap);
  }

  async ngOnInit() {
    this.getListReport();
    await this.getBranchList(this.selectedPeriod, this.selectedYear);
    await this.getChildList(
      this.selectedPeriod,
      this.selectedYear,
      this.selectedBranch
    );
    // await this.getOfficeList();
    this.getData();
    var screenWidth = window.innerWidth;
    this.pageSettings = { pageSize: screenWidth > 1366 ? 15 : 10 };
  }

  async getBranchList(period, year) {
    this.branchList = [];
    const result = await this.http
      .get<any>(
        `${environment.baseURL}/phong/phong_thuoc_huyen/?nam=${year}&ky_nhap_lieu=${period}`
      )
      .toPromise();
    this.branchList = result.map((item) => {
      return {
        name: item.ten,
        value: item._id,
        // status: item?.status,
      };
    });
    this.selectedBranch = result[0]?._id || '';
  }
  async getOfficeList() {
    this.officeList = [];
    let query = `?nam=${this.selectedYear}&ky_nhap_lieu=${this.selectedPeriod}&loai_bao_cao=${this.selectedTab}`;
    if (this.selectedBranch) {
      query += `&ma_nganh=${this.selectedBranch}`;
    }
    const result = await this.http
      .get<any>(`${environment.baseURL}/bao_cao_bang/co_quan_nhan${query}`)
      .toPromise();
    this.officeList = await result.map((r) => {
      return {
        name: r.ten,
        value: r.ma,
      };
    });
    this.selectedOffice = result[0]?.ma || '';
    // this.officeDropdown.value = this.selectedOffice;
    // this.officeDropdown.text = result[0]?.ten || '';
  }
  getListReport() {
    this.reportService.getList().subscribe((result) => {
      this.listReport = result;
    });
  }
  async getChildList(period, year, branch) {
    // const result = await this.http
    //   .get<any>(`${environment.baseURL}/role_v2/danh-sach-cap1`)
    //   .toPromise();
    const result = await this.http
      .get<any>(
        `${environment.baseURL}/role_v2/danh-sach-huyen-or-xa?ky_nhap_lieu=${period}&nam=${year}&ma_nganh=${branch}`
      )
      .toPromise();
    if (this.user.cap == 1) {
      this.dropdownTitle = undefined;
      this.selectedTemplateReport = this.user.roleid;
    } else {
      this.dropdownList = [];
      this.dropdownList = await result.map((r) => {
        return {
          name: r.ten,
          value: r._id,
          status: r.trang_thai,
        };
      });
      this.selectedTemplateReport = result[0]._id;
    }
  }
  getReportTableList(branch, office, temp) {
    this.reportService
      .getReportTable(
        this.selectedYear,
        this.selectedPeriod,
        branch,
        office,
        temp,
        this.selectedTab,
        this.user.cap
      )
      .subscribe(
        (result) => {
          this.message = undefined;
          this.reportTableList = result;
          if (result?.data.length > 0) this.check = false;
          else this.check = true;

          let level = list.tabList.findIndex(
            (t) => t.value == this.selectedTab
          );
          console.log(level, this.selectedTab);
          if (result?.data.length > 0) {
            if (
              (level == 0 && this.user.cap == '1') ||
              (level == 1 && ['2', '3'].includes(this.user.cap))
            ) {
              if (this.user.ten_chuc_vu.toLowerCase().includes('l??nh ?????o')) {
                if (result.da_trinh == 0) {
                  this.submitTitle = undefined;
                  this.cancelTitle = undefined;
                } else if (result.da_trinh == 1 && result.da_duyet == 0) {
                  if (result.phan_hoi) {
                    this.submitTitle = undefined;
                    this.cancelTitle = undefined;
                  } else {
                    this.submitTitle = 'Duy???t';
                    this.cancelTitle = 'Kh??ng duy???t';
                  }
                } else if (
                  result.da_trinh == 1 &&
                  result.da_duyet == 1 &&
                  result.da_nop == 0
                ) {
                  this.submitTitle = '???? duy???t';
                  this.cancelTitle = undefined;
                }
              } else {
                let name = this.officeList?.find(
                  (o) => o.value == this.selectedOffice
                )?.name;
                if (
                  this.user.cap == '2' &&
                  this.selectedTab == 'Phong thuoc huyen tong hop' &&
                  (name.toString().toLowerCase().includes('s???') ||
                    name == 'Ph??ng TC - KH')
                ) {
                  this.submitTitle = 'N???p b??o c??o';
                  this.cancelTitle = undefined;
                } else if (result.da_trinh == 0) {
                  this.submitTitle = 'Tr??nh c???p tr??n';
                  this.cancelTitle = undefined;
                } else if (result.da_trinh == 1 && result.da_duyet == 0) {
                  this.submitTitle = undefined;
                  this.cancelTitle = 'H???y tr??nh';
                } else if (
                  result.da_trinh == 1 &&
                  result.da_duyet == 1 &&
                  result.da_nop == 0
                ) {
                  this.submitTitle = 'N???p b??o c??o';
                  this.cancelTitle = undefined;
                } else if (
                  result.da_trinh == 1 &&
                  result.da_duyet == 1 &&
                  result.da_nop == 1
                ) {
                  this.submitTitle = undefined;
                  if (result.chap_thuan == 0) this.cancelTitle = 'H???y n???p';
                  else this.cancelTitle = undefined;
                }
              }
            } else if (
              (level == 0 && ['2', '3'].includes(this.user.cap)) ||
              (level == 1 && this.user.cap == '5')
            ) {
              if (
                (this.selectedTab == 'Xa tong hop' &&
                  ['2', '3'].includes(this.user.cap)) ||
                (this.selectedTab == 'Phong thuoc huyen tong hop' &&
                  this.user.cap == '5')
              ) {
                if (
                  result.da_trinh == 1 &&
                  result.da_duyet == 1 &&
                  result.da_nop == 1
                ) {
                  if (result.chap_thuan == 0) {
                    if (result.phan_hoi) {
                      this.submitTitle = undefined;
                      this.cancelTitle = undefined;
                    } else {
                      this.submitTitle = 'Ch???p thu???n';
                      this.cancelTitle = 'Kh??ng ch???p thu???n';
                    }
                  } else if (result.chap_thuan == 1) {
                    this.submitTitle = '???? ch???p thu???n';
                    this.cancelTitle = undefined;
                  }
                }
              }
            } else {
              this.submitTitle = undefined;
              this.cancelTitle = undefined;
            }
          } else {
            this.submitTitle = undefined;
            this.cancelTitle = undefined;
          }
        },
        (error) => {
          this.message = 'C???p d?????i ch??a n???p b??o c??o';
        }
      );
  }
  getTabName() {
    return this.tabList.find((t) => t.value == this.selectedTab).name;
  }
  checktest() {
    console.log(this.reportTableList.mo_ta);
  }
  insertReportTable(type) {
    if (type) {
      this.reportService
      .insertReportTable(
        this.selectedYear,
        this.selectedPeriod,
        this.selectedTemplateReport,
        this.selectedTab,
        this.selectedBranch,
        this.reportTableList.mo_ta,
        this.reportTableList,
        this.selectedOffice
      )
      .subscribe(
        (_) => {
          let message = type ? '???? n???p b??o c??o!' : '???? h???y n???p b??o c??o!';
          Swal.fire({
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 2250,
          });
          this.getData();
        },
        (err) => {
          this.getData();
        }
      );
    } else {
      console.log('huyNopReportTable')
      this.reportService
      .huyNopReportTable(
        this.selectedYear,
        this.selectedPeriod,
        this.selectedTemplateReport,
        this.selectedTab,
        this.selectedBranch,
        this.reportTableList.mo_ta,
        this.reportTableList,
        this.selectedOffice
      )
      .subscribe(
        (_) => {
          let message = type ? '???? n???p b??o c??o!' : '???? h???y n???p b??o c??o!';
          Swal.fire({
            icon: 'success',
            title: message,
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
  }
  change(e, type) {
    if (type == 'ky') {
      this.selectedPeriod = e.value;
      if (
        ['2', '3'].includes(this.user.cap) &&
        this.selectedTab === 'Phong thuoc huyen tong hop'
      )
        if (this.user?.ma_phong) this.getOfficeList();
      if (
        ['2', '3', '5'].includes(this.user.cap) &&
        this.selectedTab === 'Xa tong hop'
      )
        this.getChildList(e.value, this.selectedYear, this.selectedBranch);
      if (
        this.selectedTab == 'Phong thuoc huyen tong hop' &&
        this.user.cap != '2'
      )
        this.getBranchList(e.value, this.selectedYear);
    } else if (type == 'nam') {
      this.selectedYear = e.value;
      if (
        ['2', '3'].includes(this.user.cap) &&
        this.selectedTab === 'Phong thuoc huyen tong hop'
      )
        if (this.user?.ma_phong) this.getOfficeList();

      if (
        ['2', '3', '5'].includes(this.user.cap) &&
        this.selectedTab === 'Xa tong hop'
      )
        this.getChildList(this.selectedPeriod, e.value, this.selectedBranch);
      if (
        this.selectedTab == 'Phong thuoc huyen tong hop' &&
        this.user.cap != '2'
      )
        this.getBranchList(e.value, this.selectedYear);
    } else if (type == 'mau_bao_cao') this.selectedTemplateReport = e.value;
    else if (type == 'nganh') {
      this.selectedBranch = e.value;
      if (
        ['2', '3'].includes(this.user.cap) &&
        this.selectedTab === 'Phong thuoc huyen tong hop'
      )
        if (this.user?.ma_phong) this.getOfficeList();
    } else if (type == 'co_so_nhan') {
      this.selectedOffice = e.value;
    }
    this.getData();
  }
  async changeStart(e) {
    this.checkDate = false;
    this.endList = [];
    for (let i = e.value + 1; i <= 28; i++) {
      await this.endList.push(i);
    }
    this.endObj.enabled = true;
    this.endObj.text = null;
    this.endList.value = null;
  }
  changeEnd(e) {
    let day = new Date().getDate();
    this.checkDate =
      (day >= this.startObj.value && day <= this.endObj.value) ||
      !this.startObj.value ||
      !this.endObj.value
        ? false
        : true;
  }
  convertData(value) {
    return this.shareService.dotToComma(value);
  }
  getData() {
    switch (this.selectedTab) {
      case 'Xa tong hop':
        if (
          this.selectedPeriod &&
          this.selectedYear &&
          this.selectedBranch &&
          this.selectedTemplateReport
        ) {
          this.reportTableList = undefined;
          this.getReportTableList(
            this.selectedBranch,
            undefined,
            this.selectedTemplateReport
          );
        }
        break;
      case 'Phong thuoc huyen tong hop':
        if (
          this.selectedPeriod &&
          this.selectedYear &&
          this.selectedTemplateReport
        ) {
          this.reportTableList = undefined;
          if (this.user.cap == 2 && this.selectedOffice) {
            this.getReportTableList(
              this.selectedBranch,
              this.selectedOffice,
              this.selectedTemplateReport
            );
          } else if (this.selectedBranch) {
            this.getReportTableList(
              this.selectedBranch,
              this.selectedOffice,
              this.selectedTemplateReport
            );
          }
        }
        break;
      case 'Phong TC - KH bao cao':
        if (
          this.selectedPeriod &&
          this.selectedYear &&
          this.selectedTemplateReport
        ) {
          this.reportTableList = undefined;
          this.getReportTableList(
            undefined,
            this.selectedOffice,
            this.selectedTemplateReport
          );
        }
        break;
      case 'Van phong UBND Huyen':
        if (
          this.selectedPeriod &&
          this.selectedYear &&
          this.selectedTemplateReport
        ) {
          this.reportTableList = undefined;
          this.getReportTableList(
            undefined,
            this.selectedOffice,
            this.selectedTemplateReport
          );
        }
        break;
    }
  }
  save() {
    if (this.submitTitle == 'Tr??nh c???p tr??n') {
      this.chooseLeaderOpen();
    } else if (this.submitTitle == 'Duy???t') {
      this.reportService
        .updateDuyet(
          this.selectedYear,
          this.selectedPeriod,
          this.selectedTemplateReport,
          this.selectedTab,
          this.selectedBranch,
          this.selectedOffice,
          this.reportTableList
        )
        .subscribe(
          (_) => {
            Swal.fire({
              icon: 'success',
              title: '???? duy???t!',
              showConfirmButton: false,
              timer: 2250,
            });
            this.getData();
          },
          (error) => {
            this.getData();
          }
        );
    } else if (this.submitTitle == 'N???p b??o c??o') this.insertReportTable(true);
    else if (this.submitTitle == 'Ch???p thu???n')
      this.reportService
        .ChapThuan(
          this.selectedYear,
          this.selectedPeriod,
          this.selectedTemplateReport,
          this.selectedTab,
          this.selectedBranch
        )
        .subscribe(
          (_) => {
            Swal.fire({
              icon: 'success',
              title: '???? ch???p thu???n!',
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
  cancel() {
    if (this.cancelTitle == 'H???y tr??nh')
      this.reportService
        .trinh_bao_cao(
          this.selectedYear,
          this.selectedPeriod,
          this.selectedTemplateReport,
          this.selectedTab,
          this.selectedBranch,
          this.reportTableList,
          this.selectedOffice,
          0,
          undefined
        )
        .subscribe(
          (_) => {
            Swal.fire({
              icon: 'success',
              title: '???? h???y tr??nh!',
              showConfirmButton: false,
              timer: 2250,
            });
            this.getData();
          },
          (err) => {
            this.getData();
          }
        );
    else if (
      this.cancelTitle == 'Kh??ng duy???t' ||
      this.cancelTitle == 'Kh??ng ch???p thu???n'
    )
      this.dialogOpen();
    else if (this.cancelTitle == 'H???y n???p') this.insertReportTable(false);
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
    this.getData();
  }
  feedbackSave() {
    if (this.cancelTitle == 'Kh??ng duy???t') {
      this.reportService
        .HuyDuyet(
          this.selectedYear,
          this.selectedPeriod,
          this.selectedTemplateReport,
          this.selectedTab,
          this.selectedBranch,
          this.selectedOffice,
          this.reportTableList,
          this.feedbackContent
        )
        .subscribe(
          (_) => {
            Swal.fire({
              icon: 'success',
              title: '???? h???y duy???t!',
              showConfirmButton: false,
              timer: 2250,
            });
            this.getData();
          },
          (error) => {
            this.getData();
          }
        );
    } else if (this.cancelTitle == 'Kh??ng ch???p thu???n') {
      this.reportService
        .KhongChapThuan(
          this.selectedYear,
          this.selectedPeriod,
          this.selectedTemplateReport,
          this.selectedTab,
          this.selectedBranch,
          this.feedbackContent
        )
        .subscribe(
          (_) => {
            Swal.fire({
              icon: 'success',
              title: '???? h???y b??o c??o!',
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
    this.dialogClose();
  }
    format_label(text) {
    // console.log('dfff', text, text.replace('dau', '?????u').replace('cuoi', 'cu???i'))
    return text.replace('dau', '?????u').replace('cuoi', 'cu???i')
  }
  chooseLeaderOpen() {
    this.selectedLeader = undefined;
    this.chooseLeaderDrop.value = null;
    this.reportService.getLanhDao().subscribe((result) => {
      this.leaderList = result;
    });
    this.chooseLeader.show();
  }
  chooseLeaderClose() {
    this.selectedLeader = undefined;
    this.chooseLeader.hide();
  }
  changeLeader(e) {
    this.selectedLeader = e.value;
  }
  chooseLeaderSave() {
    this.reportTableList.data = this.changeDataDecimal(
      this.reportTableList.data,
      this.reportTableList.label
    );
    this.reportService
      .trinh_bao_cao(
        this.selectedYear,
        this.selectedPeriod,
        this.selectedTemplateReport,
        this.selectedTab,
        this.selectedBranch,
        this.reportTableList,
        this.selectedOffice,
        1,
        this.selectedLeader
      )
      .subscribe(
        (_) => {
          Swal.fire({
            icon: 'success',
            title: '???? tr??nh c???p tr??n!',
            showConfirmButton: false,
            timer: 2250,
          });
          this.getData();
        },
        (err) => {
          this.getData();
        }
      );
    this.chooseLeaderClose();
  }
  changeDataDecimal(data, label) {
    console.log(data);
    data.forEach((e) => {
      label.forEach((element) => {
        console.log(e[element], typeof e[element]);
        if (typeof e[element] == 'string') {
          e[element] = this.shareService.commaToDot(e[element]);
        }
      });
      if (e.children?.length > 0)
        e.children = this.changeDataDecimal(e.children, label);
    });
    return data;
  }
  getTitle(data): String {
    if (data == 1) {
      return 'N???p l???i b??o c??o';
    } else if (data == 0) {
      return 'N???p b??o c??o';
    }
  }
  public feedback = async () => {
    await this.reportService
      .updateFeedback(
        this.selectedYear,
        this.selectedPeriod,
        this.selectedTemplateReport,
        this.selectedTab,
        this.selectedBranch,
        this.feedbackContent
      )
      .subscribe((result) => {
        Swal.fire({
          icon: 'success',
          title: 'Ph???n h???i th??nh c??ng!',
          showConfirmButton: false,
          timer: 2250,
        });
      });
    this.dialogClose();
  };
  public dlgButtons = [
    {
      click: this.feedback.bind(this),
      buttonModel: { content: 'G???i', isPrimary: true },
    },
  ];
  changeReportList(id) {
    //ch???n menu b??o c??o
  }
  configRole(id) {
    //chia s??? quy???n xem b??o c??o
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
      data[arr[0].index][key] = value.target.value;
    }
  }
  async onClick(value) {
    if (this.selectedTab != value) {
      this.selectedTab = value;
      this.selectedLevel = this.tabList.findIndex((x) => x.value == value) + 1;
      this.selectedBranch =
        this.selectedTemplateReport =
        this.selectedOffice =
          null;
      this.dropdownList = this.officeList = this.branchList = undefined;
      this.selectedYear = new Date().getFullYear();
      this.selectedPeriod = 'Thang ' + (new Date().getMonth() + 1);
      this.message = undefined;
    }
    if (value == 'Xa tong hop') {
      if (this.user.cap > 1) {
        this.dropdownTitle = 'X??';
        await this.getChildList(
          this.selectedPeriod,
          this.selectedYear,
          this.selectedBranch
        );
      }
      await this.getBranchList(this.selectedPeriod, this.selectedYear);
    } else if (value == 'Phong thuoc huyen tong hop') {
      this.dropdownTitle = 'M???u b??o c??o';
      this.dropdownList = list.mau_bao_cao_phong_thuoc_huyen;
      this.selectedTemplateReport = list.mau_bao_cao_phong_thuoc_huyen[0].value;
      console.log(this.user.cap);
      if (['2', '3'].includes(this.user.cap) && this.user?.ma_phong)
        this.getOfficeList();
      if (['3', '4', '5'].includes(this.user.cap))
        await this.getBranchList(this.selectedPeriod, this.selectedYear);
    } else if (value == 'Phong TC - KH bao cao') {
      this.dropdownTitle = 'M???u b??o c??o';
      if (this.user.cap == 4) {
        console.log('1');
        this.dropdownList = undefined;
        this.selectedTemplateReport = 'Chi tieu phong giao';
      } else if (
        ['3', '5'].includes(this.user.cap) &&
        this.user.rolename != 'Huy???n X??n M???n'
      ) {
        console.log('2');
        this.dropdownList = list.mau_bao_cao_phong_TC_KH.splice(0, 1);
        this.selectedTemplateReport = this.dropdownList[0].value;
      } else {
        console.log('3');
        this.dropdownList = list.mau_bao_cao_phong_TC_KH;
        this.selectedTemplateReport = list.mau_bao_cao_phong_TC_KH[0].value;
      }
      console.log(this.dropdownList, this.selectedTemplateReport);
      this.branchList = undefined;
    } else if (value == 'Van phong UBND Huyen') {
      this.dropdownList = list.mau_bao_cao_van_phong_huyen;
      this.selectedTemplateReport = list.mau_bao_cao_van_phong_huyen[0].value;
      this.branchList = undefined;
    }
    console.log(
      this.dropdownList,
      this.dropdownTitle,
      this.selectedTemplateReport
    );
    this.reportTableList = undefined;
    this.getData();
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
