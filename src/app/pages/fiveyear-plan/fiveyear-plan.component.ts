import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { FiveyearPlanService } from '@features/service/fiveyear-plan-service/fiveyear-plan-service';
import { IndicatorGroupService } from '@features/service/indicator-group-service/indicator-group.service';
import { FiveyearPlanTableComponent } from '@features/table/fiveyear-plan-table/fiveyear-plan-table.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-fiveyear-plan',
  templateUrl: './fiveyear-plan.component.html',
  styleUrls: ['./fiveyear-plan.component.scss']
})
export class FiveyearPlanComponent implements OnInit {
  @ViewChild('fiveplanTable') fiveplanTable: FiveyearPlanTableComponent;
  _currentYear = new Date().getFullYear() -1;
  currentYear = `${this._currentYear}-${this._currentYear+4}`
  yearData = [];
  organData;
  // branchData;
  fields = { text: 'ten', value: 'ma' };
  branchFields = { text: 'ten_nhom_chi_tieu', value: 'id' };
  selectedYear = this._currentYear ;
  public height: string = '220px';

  organized: any;
  branch: any = '';
  user: any;
  indiGroupList: any;
  selectedIndiGroup: any;

  constructor(
    private fivePlanService: FiveyearPlanService,
    private authenService: AuthenticationService,
    private indiGroupService: IndicatorGroupService,
    private http: HttpClient
  ) {
    this.user = this.authenService.User;
    for (let i = 2011; i <= this._currentYear + 5; i+=5) {
      this.yearData.unshift(`${i}-${i+4}`);
    }
  }
  // formatYear(year) {
  //   console.log(`${year}-${year+5}`)
  //   return `${year}-${year+5}`
  // }
  
  ngOnInit(): void {
    this.getOr(this.selectedYear);
    // if (this.user.cap == '7')
   // this.getIndiGroup();
    // this.getBranchList();
  }

  getOr(year) {
    this.fivePlanService.get(year).subscribe((result) => {
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
    let { planList } = this.fiveplanTable;
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
    if (type == 'year') {
      this.selectedYear = e.itemData.value.split('-')[0];
      // console.log(e.itemData.value.split('-'))
      this.getOr(e.itemData.value);
    } else if (type == 'organize') {
      this.organized = e.value;
    } else if (type == 'branch') {
      this.selectedIndiGroup = e.value;
    }
  }
}
