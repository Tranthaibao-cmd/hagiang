import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { MOODLE_JWT_TOKEN } from '@features/service/authentication-service/constants';
import { IndicatorGroupService } from '@features/service/indicator-group-service/indicator-group.service';
import { PlanService } from '@features/service/plan-service/plan.service';
import { InputPlanTableComponent } from '@features/table/input-plan-table/input-plan-table.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-input-plan',
  templateUrl: './input-plan.component.html',
  styleUrls: ['./input-plan.component.scss'],
})
export class InputPlanComponent implements OnInit {
  @ViewChild('planTable') planTable: InputPlanTableComponent;
  currentYear = new Date().getFullYear();
  yearData = [];
  organData;
  // branchData;
  fields = { text: 'ten', value: 'ma' };
  branchFields = { text: 'ten_nhom_chi_tieu', value: 'id' };
  selectedYear = this.currentYear;
  public height: string = '220px';

  organized: any;
  branch: any = '';
  user: any;
  indiGroupList: any;
  selectedIndiGroup: any;

  constructor(
    private PlanService: PlanService,
    private authenService: AuthenticationService,
    private indiGroupService: IndicatorGroupService,
    private http: HttpClient
  ) {
    this.user = this.authenService.User;
    for (let i = 2010; i <= this.currentYear + 4; i++) {
      this.yearData.unshift(i);
    }
  }

  ngOnInit(): void {
    this.getOr(this.selectedYear);
    // if (this.user.cap == '7')
    this.getIndiGroup();
    // this.getBranchList();
  }
  getOr(year) {
    this.PlanService.getDSCoQuanCungCap(year).subscribe((result) => {
      this.organData = result;
      this.organized = result[0]?.ma;
    });
  }

  getIndiGroup() {
    this.indiGroupService.get().subscribe((result) => {
      this.indiGroupList = result.data[0].data;
      this.indiGroupList.unshift({id: '',ten_nhom_chi_tieu: ''})
      this.selectedIndiGroup = undefined;
    });
  }
  public doSomething(date: any): void {}
  getDownloadURL() {
    let { planList } = this.planTable;
    let data = {
      data: [],
      datafromfe: planList,
      header_list: [
        {
          cell: 'A1:R1',
          text: 'CHÌ TIÊU KẺ HOẠCH PHÁT TRIÉN KINH TẾ - XÃ HỘI NÁM 2021',
          format: {
            bold: 1,
            align: 'center',
            valign: 'vcenter',
            font_name: 'Times New Roman',
          },
        },
        {
          cell: 'A2:R2',
          text: '(Ban hành kèm theo Quyết định sổ: 2355 /QĐ-UBND ngày 11 thảng 12 năm 2020 của ủy ban nhân dân tinh Hà Giang)',
          format: {
            italic: 1,
            align: 'center',
            valign: 'vcenter',
            font_name: 'Times New Roman',
          },
        },
      ],
      footer_list: [],
    };
    // this.http.post(`${environment.baseURL}/bieu_giao_ke_hoach`, data).subscribe(
    //   (response) => {
    //     window.location.href = response.toString();
    //   },
    //   (error) => {}
    // );
    this.http.get(`${environment.baseURL}/ke_hoach/export/?nam=${this.selectedYear}`).subscribe(
      (response) => {
        window.location.href = response.toString();
      },
      (error) => {}
    );
  }
  change(e, type) {
    console.log(e);
    if (type == 'year') {
      this.selectedYear = e.itemData.value;
      this.getOr(e.itemData.value);
    } else if (type == 'organize') {
      this.organized = e.value;
    } else if (type == 'branch') {
      this.selectedIndiGroup = e.value;
    }
  }
}
