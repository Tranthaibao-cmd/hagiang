import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { IndicatorYearService } from '@features/service/indicator-year-service/indicator-year.service';
import { PlanService } from '@features/service/plan-service/plan.service';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config-indi-year',
  templateUrl: './config-indi-year.component.html',
  styleUrls: ['./config-indi-year.component.scss'],
})
export class ConfigIndiYearComponent implements OnInit {
  @ViewChild('treegrid') treegrid: TreeGridComponent;
  public yearData = [];
  public indiYearList;
  public userGroupList;
  public currentYear = new Date().getFullYear();
  public changedList = [];
  public pageSettings;
  public toolbar;
  public searchSettings;
  public mode = 'CheckBox';
  public filterPlaceholder = 'Tìm kiếm';
  public user;
  constructor(
    private indiYService: IndicatorYearService,
    private planService: PlanService,
    private userService: AuthenticationService
  ) {
    this.userService.getUserObservable().subscribe((res) => {
      this.user = res;
    });
    for (let i = 2010; i <= this.currentYear + 1; i++) {
      this.yearData.unshift(i);
    }
  }

  ngOnInit(): void {
    this.getUserGroupList();
    this.getIndiYear(this.currentYear);
    if (this.user.cap == 1) this.toolbar = ['Search'];
    else
      this.toolbar = [
        {
          text: 'Lưu',
          prefixIcon: 'e-save_3',
          id: 'save_indi',
        },
        'Search',
      ];
    this.searchSettings = { hierarchyMode: 'Child' };
    var screenWidth = window.innerWidth;
    this.pageSettings = { pageSize: screenWidth > 1366 ? 15 : 10 };
  }

  getIndiYear(year) {
    this.indiYService.get(year).subscribe((result) => {
      this.indiYearList = result;
    });
  }
  getUserGroupList() {
    this.planService.getCap1().subscribe((result) => {
      this.userGroupList = [];
      result.forEach((e) => {
        this.userGroupList.push({ name: e.ten, id: e.ma });
      });
    });
  }
  change(e) {
    this.currentYear = e.value;

    this.getIndiYear(e.value);
  }

  changeRole(e, id) {
    let x = [];
    for (var i = 0; i < e.value.length; i++) {
      if (x.indexOf(e.value[i]) === -1) {
        x.push(e.value[i]);
      }
    }
    // x= Array.from(new Set(e.value))
    this.changedList.push({
      ma_chi_tieu: id,
      ma_nhom_nguoi_dung: x,
    });
    Array.from(new Set(this.changedList));
  }
  clickHandler(args): void {
    if (args.item.id === 'save_indi') {
      this.save();
    }
  }
  insertIndiYear(indi) {
    this.indiYService
      .insert(indi.ma_chi_tieu, this.currentYear, indi.ma_nhom_nguoi_dung)
      .subscribe((result) => {
        Swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công!',
          showConfirmButton: false,
          timer: 2250,
        });
        this.getIndiYear(this.currentYear);
      });
  }
  async save() {
    await this.changedList.forEach((item) => {
      this.insertIndiYear(item);
    });
    this.changedList = [];
    this.getIndiYear(this.currentYear);
  }
  public onLoad() {
    this.treegrid.element.addEventListener(
      'keydown',
      this.debounce((e) => {
        if (e.target.getAttribute('id')?.indexOf('_searchbar') !== -1) {
          this.treegrid.search((e.target as HTMLInputElement).value);
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
  dataBound(args) {
    let toolbar;
    this.treegrid.toolbarModule
      .getToolbar()
      .childNodes[0].childNodes.forEach((item) => {
        if (item['classList'].contains('e-toolbar-left')) {
          toolbar = item.childNodes;
        } else if (item['classList'].contains('e-hscroll-bar')) {
          toolbar = item.childNodes[0].childNodes[0].childNodes;
        }
      });
    toolbar.forEach((item) => {
      let element = item.childNodes[0];
      switch (element['innerText']) {
        case 'Thêm mới':
          element['classList'].add('add-toolbar-btn');
          break;
        case 'Sửa':
          element['classList'].add('edit-toolbar-btn');
          break;
        case 'Xóa':
          element['classList'].add('delete-toolbar-btn');
          break;
        case 'Lưu':
          element['classList'].add('save-toolbar-btn');
          break;
        case 'Hủy':
          element['classList'].add('cancel-toolbar-btn');
          break;
      }
    });
    if ((this.treegrid.dataSource as any)?.length === 0) {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'none';
    } else {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'block';
    }
  }
}
