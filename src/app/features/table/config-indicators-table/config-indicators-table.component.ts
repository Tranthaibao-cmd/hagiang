import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { IndicatorService } from '@features/service/indicator-service/indicator.service';
import { IndicatorMeasureService } from '@features/service/indicator-measure/indicator-measure.service';
import {
  DialogEditEventArgs,
  SaveEventArgs,
  TextWrapSettingsModel,
} from '@syncfusion/ej2-angular-grids';
import { EditSettingsModel } from '@syncfusion/ej2-angular-grids';
import { FormGroup } from '@angular/forms';
import { ConfigIndicatorMeasureFormComponent } from '@features/form/config-indicator-measure-form/config-indicator-measure-form.component';
import { BehaviorSubject } from 'rxjs';
import { TagData, TagifySettings } from 'ngx-tagify';
import { checkResource } from '@shared/share';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { IndicatorGroupService } from '@features/service/indicator-group-service/indicator-group.service';
import { UnitService } from '@features/service/unit-service/unit.service';
import { RoleService } from '@features/service/role-service/role.service';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { IndicatorYearService } from '@features/service/indicator-year-service/indicator-year.service';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { DistrictService } from '@features/service/district-service/district.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config-indicators-table',
  templateUrl: './config-indicators-table.component.html',
  styleUrls: ['./config-indicators-table.component.scss'],
})
export class ConfigIndicatorsTableComponent implements OnInit {
  public hcList = [
    'Tỉnh Hà Giang',
    'Huyện Đồng Văn',
    'Huyện Mèo Vạc',
    'Huyện Yên Minh',
    'Huyện Quản Bạ',
    'Huyện Vị Xuyên',
    'Huyện Bắc Mê',
    'Huyện Hoàng Su Phì',
    'Huyện Xín Mần',
    'Huyện Bắc Quang',
    'Huyện Quang Bình',
  ];
  public input_items;
  public indiList: IIndicatorMeasureModel[];
  public indiGroupList = [];
  public unitList = [];
  public userGroupList = [];
  public toolbar;
  public pageSettings;
  public PeriodParams;
  public unitParams;
  public position;
  public width = 250;
  public Year: any = new Date().getFullYear();
  public checkedList = [];
  public periodList = [
    { Name: 'Tháng' },
    { Name: 'Quý' },
    { Name: '6 tháng' },
    { Name: '9 tháng' },
    { Name: 'Năm' },
  ];
  public indiGroupFields = {
    text: 'text',
    value: 'value',
  };
  tagifySettings: TagifySettings = {
    placeholder: 'Tham số đầu vào...',
    duplicates: false,
    enforceWhitelist: false,
    callbacks: {
      click: (e) => {},
    },
    dropdown: {
      classname: 'color-blue',
      enabled: 0, // show the dropdown immediately on focus
      maxItems: 0,
      position: 'text', // place the dropdown near the typed text
      closeOnSelect: true, // keep the dropdown open after selecting a suggestion
      highlightFirst: true,
    },
  };
  tagifyWhitelist$ = new BehaviorSubject<TagData[]>([]);
  @ViewChild('backgroundgrid', { static: true }) backgroundgrid: ElementRef;
  @ViewChild('grid')
  public grid: TreeGridComponent;
  public wrapSettings: TextWrapSettingsModel;
  public editSettings: EditSettingsModel;
  @ViewChild('indicatorForm')
  public indicatorForm: ConfigIndicatorMeasureFormComponent;
  public indicatorFormGroup: FormGroup;
  @ViewChild('ma_chi_tieu')
  public ma_chi_tieu: ElementRef;
  @ViewChild('ten_chi_tieu')
  public ten_chi_tieu: ElementRef;
  public indicatorData: IIndicatorMeasureModel;
  grid_isAdd: boolean = false;
  @ViewChild('dialog') dialog: DialogComponent;
  @ViewChild('yearDrop') yearDrop: DropDownList;
  indiYearList = [];
  public yearData = [];
  check_items: any;
  user: any;
  administrativeUnits: any;
  indicatorGroup: any;
  danhSachSo: any[];
  checkAll = false;
  Indi: any;
  indicatorGroupList: any;
  indicatorList: any;
  constructor(
    private indicatorMeasureService: IndicatorMeasureService,
    private inputService: IndicatorService,
    private indicatorGroupService: IndicatorGroupService,
    private districtService: DistrictService,
    private unitService: UnitService,
    private userGroupService: RoleService,
    private indiYService: IndicatorYearService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    checkResource(
      'Tài nguyên Cấu hình - Chỉ tiêu',
      this.authService,
      this.router
    );
    let currentYear = new Date().getFullYear();
    for (let i = 2010; i <= currentYear + 1; i++) {
      this.yearData.unshift(i);
    }
    this.authService.getUserObservable().subscribe((res) => {
      this.user = res;
    });
  }

  ngOnInit(): void {
    this.PeriodParams = {
      params: {
        allowFiltering: false,
        dataSource: new DataManager(this.periodList),
        fields: { text: 'Name', value: 'Name' },
        query: new Query(),
        actionComplete: () => false,
      },
    };
    const input_items = this.getInputs();
    this.getCheckItems();
    this.indicatorMeasureService.refresh$.subscribe(() => {
      this.getIndicators();
    });
    this.getDanhSachSo();
    this.getIndicators();
    this.getIndiGroup();
    this.getUnit();
    this.getUserGroupList();
    this.getAdministrativeUnits();
    this.getIndicatorGroup();
    this.editSettings = {
      showDeleteConfirmDialog: true,
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog',
    };
    if (this.user.cap === '6') {
      this.toolbar = [
        'Add',
        'Edit',
        'Delete',
        {
          text: 'Tạo chỉ tiêu năm',
          prefixIcon: 'e-config-indi',
          id: 'create-indi',
        },
        'Search',
      ];
    } else if (
      this.user.cap === '5' ||
      !['Sở kế hoạch đầu tư', 'Huyện Xín Mần'].includes(this.user.rolename)
    )
      this.toolbar = ['Search'];
    else
      this.toolbar = [
        'Add',
        'Edit',
        'Delete',
        {
          text: 'Tạo chỉ tiêu năm',
          prefixIcon: 'e-config-indi',
          id: 'create-indi',
        },
        'Search',
      ];
    var screenWidth = window.innerWidth;
    if (screenWidth > 1366) {
      this.pageSettings = { pageSize: 20 };
    } else {
      this.pageSettings = { pageSize: 10 };
    }
    this.position = { X: (screenWidth - this.width) / 2, Y: 14 };
  }
  getCheckItems() {
    this.inputService.getAllIndicator(this.Year).subscribe((data) => {
      this.check_items = data;
    });
  }
  getAdministrativeUnits() {
    this.indicatorMeasureService
      .getAdministrativeUnits()
      .subscribe((result) => {
        this.administrativeUnits = result;
      });
  }
  getIndicatorGroup() {
    this.indicatorGroupService.get().subscribe((result) => {
      this.indicatorGroup = result.data[0].data;
      this.indicatorGroupList = result.data[0].data.map((d) => {
        return { text: d.ten_nhom_chi_tieu, value: d.ten_nhom_chi_tieu };
      });
      this.indicatorGroupList.unshift({ text: 'Tất cả', value: '' });
    });
  }
  getInputs(): any {
    var receiveData;
    this.indicatorMeasureService.getInputItems().subscribe((data) => {
      this.input_items = data;
      this.getWhitelistFromInputItems(this.input_items);
    });
    // this.inputService.getIndicator(1, 0).subscribe((data) => {
    //   this.input_items = data; // sửa lỗi search
    //   this.getWhitelistFromInputItems(this.input_items);
    // });
    return receiveData;
  }
  setData(data) {
    let x = data?.map((r) => {
      if (r.children.length > 0) r.children = this.setData(r.children);
      if (r.phong_quan_ly?.length > 0) {
        let split = r.phong_quan_ly
          ?.filter((f) => {
            let s = f.split('_');
            if (s[0] == this.user.roleid) {
              return f;
            }
          })
          .map((i) => {
            let splite = i.split('_');
            console.log(splite);
            if (splite?.length > 0) return splite[splite.length - 1];
          });
        console.log(split);
        r.phong_quan_ly = split;
      }
      return r;
    });
    return x;
  }
  getChiTieuCha(data, arr) {
    arr.push({
      ten_chi_tieu: data.ten_chi_tieu,
      ma_chi_tieu: data.ma_chi_tieu,
    });
    if (data.children?.length > 0) {
      data.children.forEach((e) => {
        this.getChiTieuCha(e, arr);
      });
    }
  }
  getIndicators() {
    this.indicatorMeasureService
      .getIndicators(null, 1, 1000, this.Year, this.Indi)
      .subscribe((result) => {
        this.indicatorList = [{ ten_chi_tieu: '', ma_chi_tieu: '' }];
        this.indiList = this.setData(result);
        console.log(this.indiList);
        result.forEach((element) => {
          this.getChiTieuCha(element, this.indicatorList);
          // .push({
          //   ten_chi_tieu: element.ten_chi_tieu,
          //   ma_chi_tieu: element.ma_chi_tieu,
          // });
        });
        console.log(this.indicatorList);
        this.getCheckAll();
        this.checkedList = result.map((i) => {
          return { id: i.ma_chi_tieu, value: i.tt_ctn };
        });
      });
  }
  currentYear(arg0: null, arg1: number, arg2: number, currentYear: any) {
    throw new Error('Method not implemented.');
  }
  getCheck(ma_chi_tieu, trang_thai) {
    let index = this.checkedList.find((c) => c.id == ma_chi_tieu);
    if (index) return index.value == 1 ? true : false;
    else return trang_thai == 1 ? true : false;
  }
  getUnit() {
    this.unitService.get().subscribe((result) => {
      this.unitParams = {
        params: {
          allowFiltering: false,
          dataSource: new DataManager(result.data[0].data),
          fields: { text: 'ten_don_vi_tinh', value: 'ten_don_vi_tinh' },
          query: new Query(),
          actionComplete: () => false,
        },
      };
      this.unitList = [];
      result.data[0].data.forEach((i) => {
        this.unitList.push({
          ten_don_vi_tinh: i.ten_don_vi_tinh,
          ma_don_vi_tinh: i.ma_don_vi_tinh,
        });
      });
    });
  }
  getUserGroupList() {
    this.userGroupService.getAll().subscribe((result) => {
      this.userGroupList = [];
      result.forEach((e) => {
        this.userGroupList.push({ name: e.ten, id: e._id });
      });
    });
  }
  getIndiGroup() {
    this.districtService.getPhongThuocHuyenCT().subscribe((result) => {
      this.indiGroupList = [];
      result.forEach((i) => {
        this.indiGroupList.push({
          name: i.ten_phong,
          value: i._id,
        });
      });
    });
  }
  getDanhSachSo() {
    this.userGroupService.getDanhSachSo().subscribe((result) => {
      this.danhSachSo = [];
      result.forEach((i) => {
        this.danhSachSo.push({
          name: i.ten,
          value: i._id,
        });
      });
    });
  }
  change(e, type) {
    if (type == 'year') this.Year = e.value;
    else if (type == 'indi') this.Indi = e.value;
    this.getIndicators();
    this.checkedList = [];
    this.getCheckItems();
  }
  clickHandler(args: ClickEventArgs): void {
    if (args.item.id === 'create-indi') {
      this.createIndi();
    }
  }
  async createIndi() {
    await this.checkedList.forEach((item) => {
      this.indiYService
        .insertQuantity(item.id, this.Year, item.value)
        .subscribe((r) => {
          Swal.fire({
            icon: 'success',
            title: 'Cập nhật thành công!',
            showConfirmButton: false,
            timer: 2250,
          });
        });
    });
    this.getIndicators();
    this.checkedList = [];
  }
  actionBegin(args: SaveEventArgs) {
    if (args.requestType === 'add') {
      this.indicatorData = {};
      if (this.grid.selectedRowIndex >= 0) {
        // let
        this.indicatorData.ma_hien_thi =
          this.grid.flatData[this.grid.selectedRowIndex]['ma_chi_tieu'];
      }
      this.indicatorData.don_vi_hanh_chinh =
        this.administrativeUnits[0]?.ten_dv_giao;
      this.indicatorData.ten_don_vi = this.unitList[0].ten_don_vi_tinh;
      this.indicatorData.cot_loi = 0;
      this.grid_isAdd = true;
    }
    if (args.requestType === 'beginEdit') {
      if (this.EditCondition(args.rowData)) {
        this.indicatorData = Object.assign({}, args.rowData);
        if (
          this.indicatorData?.cot_loi == null ||
          this.indicatorData?.cot_loi == undefined
        ) {
          this.indicatorData.cot_loi = 0;
        }
        this.grid_isAdd = false;
      } else {
        args.cancel = true;
      }
    }
    if (args.requestType === 'save') {
      let newIndicatorData = this.indicatorForm.indicatorMeasureData;
      this.indiGroupList.forEach((item) => {
        if (item.ten_nhom_chi_tieu == newIndicatorData['ten_nhom_chi_tieu']) {
          newIndicatorData['ma_nhom_chi_tieu'] = item.ma_nhom_chi_tieu;
        }
      });
      let adminUnit = this.administrativeUnits.filter(
        (a) => a.ten_dv_giao == newIndicatorData['don_vi_hanh_chinh']
      )[0];
      newIndicatorData['ma_don_vi_hanh_chinh'] = adminUnit?.ma_dv_giao || '';
      if (
        newIndicatorData['cong_don'] != 0 &&
        newIndicatorData['cong_don'] != 1
      ) {
        newIndicatorData['cong_don'] = 1;
      }
      if (newIndicatorData['cot_loi'] && this.user.cap == 7) {
        newIndicatorData['phong_quan_ly'] = [];
      }
      if (this.indicatorForm.inputForm.valid) {
        if (args.action == 'add') {
          this.indicatorMeasureService.insert(newIndicatorData).subscribe(
            (result) => {
              console.log(result);
              if (result?.code == 405)
                Swal.fire({
                  icon: 'error',
                  title: result?.message
                    ? result.message
                    : 'Thêm không thành công!',
                  showConfirmButton: true,
                  confirmButtonText: 'Đồng ý',
                  timer: 3000,
                });
              else
                Swal.fire({
                  icon: 'success',
                  title: 'Thêm thành công!',
                  showConfirmButton: false,
                  timer: 2250,
                });
            },
            (err) => {
              console.log(err);
            }
          );
        } else if (args.action == 'edit') {
          this.indicatorMeasureService
            .update(newIndicatorData.ma_chi_tieu, newIndicatorData)
            .subscribe((result) => {
              Swal.fire({
                icon: 'success',
                title: 'Cập nhật thành công!',
                showConfirmButton: false,
                timer: 2250,
              });
            });
        }
      } else {
        args.cancel = true;
      }
    }
    if (args.requestType === 'delete') {
      if (this.EditCondition(args.data[0])) {
        this.indicatorMeasureService.delete(args.data[0].ma_chi_tieu).subscribe(
          (result) => {
            Swal.fire({
              icon: 'success',
              title: 'Xóa thành công!',
              showConfirmButton: false,
              timer: 2250,
            });
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Xóa không thành công!',
              showConfirmButton: false,
              timer: 2250,
            });
          }
        );
      } else {
        args.cancel = true;
      }
    }
  }
  EditCondition(data) {
    return (
      this.user.cap === '7' ||
      (this.user.cap === '6' && data.cot_loi === 0) ||
      this.user.cap === '3' ||
      //  &&
      // [this.user.rolename, 'Phòng TC - KH'].includes(
      // data.don_vi_hanh_chinh
      // )
      (this.user.cap === '2' && data?.don_vi_hanh_chinh === this.user.ten_phong)
    );
  }
  enableDropdown(data) {
    if (
      data?.don_vi_hanh_chinh == 'UBND tỉnh Hà Giang' &&
      data?.cot_loi == 1 &&
      this.user.cap == '3'
    ) {
      return false;
    } else {
      return true;
    }
  }
  actionComplete(args: DialogEditEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      args.dialog.header =
        args.requestType === 'add'
          ? 'Thêm mới chỉ tiêu'
          : `Chỉ tiêu: ${args.rowData['ten_chi_tieu']}`;
      const form = args.form
        .childNodes[0] as unknown as ConfigIndicatorMeasureFormComponent;
      form.indicatorMeasureData = this.indicatorData;
      form.isAdd = args.requestType === 'add';
      if (args.requestType === 'beginEdit') {
      }
    }
  }
  onFormularChanged(asciiMath: string) {}
  getWhitelistFromInputItems(input_items: any) {
    const _tags = input_items.map((i) => ({
      value: i.ten_dau_vao,
      code: i.ma_dau_vao,
    }));
    this.tagifyWhitelist$ = new BehaviorSubject(_tags);
  }
  getInputTags(inputs: any): string {
    var tags = [];
    for (let k in inputs) {
      const input = this.check_items.find((i) => i.ma_dau_vao == inputs[k]);
      if (input) {
        const tag: TagData = {
          value: input.ten_dau_vao,
          code: input.ma_dau_vao,
        };
        tags.push(tag);
      }
    }
    return JSON.stringify(tags);
  }
  dataBound(args) {
    let toolbar;
    this.grid.toolbarModule
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
        case 'Tạo chỉ tiêu năm':
          element['classList'].add('cancel-toolbar-btn');
          break;
      }
    });
    if ((this.grid.dataSource as any)?.length === 0) {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'none';
    } else {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'block';
    }
  }
  public onLoad() {
    this.grid.element.addEventListener(
      'keydown',
      this.debounce((e) => {
        if (e.target.getAttribute('id')?.indexOf('_searchbar') !== -1) {
          this.grid.search((e.target as HTMLInputElement).value);
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
  checked(e) {
    let index = this.checkedList.findIndex(
      (c) => c.id == e.path[2].cells[1].innerText
    );
    if (index >= 0) {
      this.checkedList[index].value = e.target.checked ? 1 : 0;
    } else {
      this.checkedList.push({
        id: e.path[2].cells[1].innerText,
        value: e.target.checked ? 1 : 0,
      });
    }
    this.getCheckAll();
  }

  checkedAll(e) {
    if (e.target.checked) {
      this.checkedList = this.indiList
        .filter((i) => this.EditCondition(i))
        .map((i) => {
          return { id: i.ma_chi_tieu, value: 1 };
        });
      this.checkAll = true;
    } else {
      this.checkedList = this.indiList
        .filter((i) => this.EditCondition(i))
        .map((i) => {
          return { id: i.ma_chi_tieu, value: 0 };
        });
      this.checkAll = false;
    }
  }
  getCheckAll() {
    let numb = this.indiList.filter((i) => {
      let checked = this.checkedList.find((c) => c.id == i.ma_chi_tieu);
      if (checked) {
        return checked.value == 0 && this.EditCondition(i);
      } else {
        return i['tt_ctn'] == 0 && this.EditCondition(i);
      }
    });
    if (numb.length > 0) this.checkAll = false;
    else this.checkAll = true;
  }
}
export interface IIndicatorMeasureModel {
  _id?: string;
  ma_chi_tieu?: string;
  ma_hien_thi?: string;
  ten_chi_tieu?: string;
  don_vi_hanh_chinh?: string;
  ky_tinh?: string;
  // ten_nhom_chi_tieu?: string;
  // ma_nhom_chi_tieu?: string;
  ma_don_vi_hanh_chinh?: string;
  ten_don_vi?: string;
  cong_don?: number;
  ma_loai_ct?: string;
  ky_bao_cao?: string;
  cot_loi?: number;
  so_quan_ly?: string;
  phong_quan_ly?: string[];
  // ma_nhom_nguoi_dung?: string[];
  // ten_nhom_nguoi_dung?: string[];
  tham_so_dau_vao?: { [index: string]: string };
  cong_thuc?: string;
  trang_thai?: boolean;
}
