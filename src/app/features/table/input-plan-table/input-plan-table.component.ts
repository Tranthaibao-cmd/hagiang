import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { PlanService } from '@features/service/plan-service/plan.service';
import { ShareFunctionService } from '@features/service/share-function-service/share-function.service';
import { UnitService } from '@features/service/unit-service/unit.service';
import { UserService } from '@features/service/user-service/user.service';
import {
  DataStateChangeEventArgs,
  RowDataBoundEventArgs,
} from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-input-plan-table',
  templateUrl: './input-plan-table.component.html',
  styleUrls: ['./input-plan-table.component.scss'],
})
export class InputPlanTableComponent implements OnInit {
  @Input('selectedYear') selectedYear;
  @Input('organized') organized;
  @Input('branch') branch;

  subscription: Subscription;
  @ViewChild('treegrid') treegrid: TreeGridComponent;
  public currentYear = new Date().getFullYear();
  public href;
  public selectedFile;
  public planList: Observable<DataStateChangeEventArgs>;
  public toolbar;
  public pageSettings;
  public unitList;
  public width = 250;
  public position;
  public flag = true;
  public numericParams = [{ params: { decimals: 2, step: 1, min: 0 } }];
  public fields = { text: 'ten_don_vi_tinh', value: 'ten_don_vi_tinh' };
  public inputList = [];
  public user;
  constructor(
    private planService: PlanService,
    private unitService: UnitService,
    private userService: AuthenticationService,
    private shareService: ShareFunctionService
  ) {
    this.user = this.userService.User;
  }
  ngOnChanges(): void {
    this.inputList = [];
    this.get();
  }

  ngOnInit(): void {
    this.planService.refresh$.subscribe(() => {
      this.get();
    });
    this.getUnit();
    this.get();
    if (this.user.cap === '1') this.toolbar = ['Search'];
    else
      this.toolbar = [
        {
          text: 'Lưu',
          prefixIcon: 'e-save_2',
          id: 'updateinput',
        },
        'Search',
      ];
    var screenWidth = window.innerWidth;
    this.pageSettings = { pageSize: screenWidth > 1366 ? 15 : 10 };
    this.position = { X: (screenWidth - this.width) / 2, Y: 100 };
  }
  get() {
    this.planService
      .get(this.selectedYear, this.branch, this.organized)
      .subscribe((result) => {
        this.planList = result;
      });
  }
  update(plan) {
    if (typeof plan.ke_hoach_duoc_giao == 'string')
      plan.ke_hoach_duoc_giao = this.shareService.commaToDot(
        plan.ke_hoach_duoc_giao
      );
    if (typeof plan.ke_hoach == 'string')
      plan.ke_hoach = this.shareService.commaToDot(plan.ke_hoach);
    this.planService.insert(plan).subscribe(
      (result) => {
        if (result.code == 200)
          Swal.fire({
            icon: 'success',
            title: 'Cập nhật thành công!',
            showConfirmButton: false,
            timer: 2250,
          });
        else
          Swal.fire({
            icon: 'success',
            title: result.message,
            showConfirmButton: false,
            timer: 2250,
          });
      },
      (_) => {
        Swal.fire({
          icon: 'error',
          title: 'Cập nhật không thành công!',
          showConfirmButton: false,
          timer: 2250,
        });
        this.get();
      }
    );
  }
  getUnit() {
    this.unitService.get().subscribe((result) => {
      this.unitList = result.data[0].data;
    });
  }
  clickHandler(args: ClickEventArgs): void {
    if (args.item.id === 'updateinput') {
      this.inputList.forEach((e) => {
        this.update(e);
      });
      this.inputList = [];
    }
  }
  changeKeHoach(e, data, type) {
    if (e?.target.value != null) {
      let index = this.inputList.findIndex((i) => i.id == data._id);
      console.log(index);
      if (index >= 0) {
        this.inputList[index][type] = e.target.value;
      } else {
        this.inputList.push({
          id: data._id,
          ma_chi_tieu: data.ma_chi_tieu,
          nam: data.nam,
          ma_co_quan_cung_cap: this.organized,
          ke_hoach_duoc_giao:
            type == 'ke_hoach_duoc_giao'
              ? e.target.value
              : data.ke_hoach_duoc_giao,
          ke_hoach: type == 'ke_hoach' ? e.target.value : data.ke_hoach,
          mo_ta: data.mo_ta,
        });
      }
    }
    console.log(this.inputList);
  }
  changeMoTa(e, data) {
    if (e?.target.value != undefined && e != undefined) {
      let index = this.inputList.findIndex((i) => i.id == data._id);
      if (index >= 0) {
        this.inputList[index].mo_ta = e.target.value;
      } else {
        this.inputList.push({
          id: data._id,
          ma_chi_tieu: data.ma_chi_tieu,
          nam: data.nam,
          ma_co_quan_cung_cap: this.organized,
          ke_hoach_duoc_giao: data.ke_hoach_duoc_giao,
          ke_hoach: data.ke_hoach,
          mo_ta: e.target.value,
        });
      }
    }
  }
  getValue(id, value, type) {
    let index = this.inputList.findIndex((i) => i.id == id);
    let data_value = this.inputList[index]?.[type];
    return data_value ? data_value : this.shareService.dotToComma(value);
  }
  getMotaValue(id, value, type) {
    let index = this.inputList.findIndex((i) => i.id == id);
    let data_value = this.inputList[index]?.[type];
    return data_value;
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
  mouseOver(args) {
    // if (args.toElement.className == 'e-rowcell') {
    //   let ten_chi_tieu = args.toElement.parentElement.childNodes[0].innerHTML;
    //   this.planService.getValue(ten_chi_tieu).subscribe((result) => {
    //     let temp = result;
    //     // for (let x = 0; x < temp.length; x++) {
    //       // for (let key of temp[x]) {
    //       // }
    //     // }
    //   });
    // }
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
  created(e) {
    // this.treegrid.toolbarModule.toolbar.items.forEach((e) => {
    //   e.tooltipText = '';
    // });
  }
  rowDataBound(args: RowDataBoundEventArgs) {
    if (
      args.data['ma_nguoi_tao'] == this.user.roleid ||
      args.data['ma_nguoi_tao'] == ''
    ) {
    } else args.row.classList.add('row-disable');
    // if (args.data[Freight] < 30) {
    //     args.row.classList.add('below-30');
    // } else if (args.data[Freight] < 80) {
    //     args.row.classList.add('below-80');
    // } else {
    //     args.row.classList.add('above-80');
    // }
  }
  public focusIn(target: HTMLElement): void {
    target.parentElement.classList.add('e-input-focus');
  }
  public focusOut(target: HTMLElement): void {
    target.parentElement.classList.remove('e-input-focus');
  }
}
