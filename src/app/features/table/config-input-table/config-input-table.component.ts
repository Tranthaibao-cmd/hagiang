import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IndicatorService } from '@features/service/indicator-service/indicator.service';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { RoleService } from '@features/service/role-service/role.service';
import { UnitService } from '@features/service/unit-service/unit.service';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs/Observable';
import { GrdpService } from '@features/service/grdp-service/grdp.service';
import { checkResource } from '@shared/share';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-angular-popups';
import { regex } from './regex';
import { IndicatorGroupService } from '@features/service/indicator-group-service/indicator-group.service';
import { HTMLFormatter } from '@syncfusion/ej2-richtexteditor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config-input-table',
  templateUrl: './config-input-table.component.html',
  styleUrls: ['./config-input-table.component.scss'],
})
export class ConfigInputTableComponent implements OnInit {
  @ViewChild('backgroundgrid', { static: true }) backgroundgrid: ElementRef;
  @ViewChild('grid') grid: GridComponent;
  public regexs = regex;
  public roleList = [];
  public grdpList = [];
  public toolbar;
  public pageSettings;
  public editSettings;
  public indiList: Observable<DataStateChangeEventArgs>;
  public RoleParams;
  public PeriodParams;
  public UnitParams;
  public GrdpParams;
  public position;
  public width = 250;
  public tooltip: Tooltip;
  public periodList = [
    { Name: 'Tháng' },
    { Name: 'Quý' },
    { Name: '6 tháng' },
    { Name: 'Năm' },
  ];
  public unitList;
  indiGroupList: any;
  indiGroupParams: {
    params: {
      allowFiltering: boolean;
      dataSource: DataManager;
      fields: { text: string; value: string };
      width: string;
      query: Query;
      actionComplete: () => boolean;
      close: any;
    };
  };
  constructor(
    private IGService: IndicatorGroupService,
    private indicatorService: IndicatorService,
    private roleService: RoleService,
    private unitService: UnitService,
    private grdpService: GrdpService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    checkResource(
      'Tài nguyên Cấu hình - Đầu vào chỉ tiêu',
      this.authService,
      this.router
    );
  }
  ngOnInit(): void {
    this.indicatorService.refresh$.subscribe(() => {
      this.get();
    });
    this.get();
    this.getRole();
    this.getUnit();
    this.getGRDP();
    this.getIndicatorGroup();
    this.PeriodParams = {
      params: {
        allowFiltering: false,
        dataSource: new DataManager(this.periodList),
        fields: { text: 'Name', value: 'Name' },
        query: new Query(),
        actionComplete: () => false,
      },
    };
    this.editSettings = {
      showDeleteConfirmDialog: true,
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
    };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'];
    var screenWidth = window.innerWidth;
    this.pageSettings = { pageSize: screenWidth > 1366 ? 15 : 10 };
    this.position = { X: (screenWidth - this.width) / 2, Y: 100 };
  }
  ngAfterViewInit() {
    //Initialize Tooltip component
    this.tooltip = new Tooltip({
      // set target element to tooltip
      target: '.e-list-item',
      // set position of tooltip
      position: 'TopCenter',
      // Triggers before the tooltip is rendered
      beforeRender: this.onBeforeRender.bind(this),
    });
    this.tooltip.appendTo('body');
  }
  onBeforeRender(args: TooltipEventArgs): void {
    this.tooltip.content = args.target.innerText;
    this.tooltip.dataBind();
  }
  getUnit() {
    this.unitService.get().subscribe((result) => {
      this.unitList = result.data[0].data;
      this.UnitParams = {
        params: {
          allowFiltering: false,
          dataSource: new DataManager(this.unitList),
          fields: { text: 'ten_don_vi_tinh', value: 'ten_don_vi_tinh' },
          query: new Query(),
          actionComplete: () => false,
        },
      };
    });
  }
  getRole() {
    this.roleService.getAll().subscribe((result) => {
      result.forEach((item) => {
        this.roleList.push({ ten: item['ten'], id: item['_id'] });
      });
      this.RoleParams = {
        params: {
          allowFiltering: true,
          dataSource: new DataManager(this.roleList),
          fields: { text: 'ten', value: 'ten' },
          query: new Query(),
          actionComplete: () => false,
        },
      };
    });
  }
  getGRDP() {
    this.grdpService.getRoot().subscribe((result) => {
      result.forEach((item) => {
        this.grdpList.push({ ten: item['ten'], id: item['id'] });
      });
      this.grdpList.unshift({ ten: '', id: '' });
      this.GrdpParams = {
        params: {
          allowFiltering: true,
          dataSource: new DataManager(this.grdpList),
          fields: { text: 'ten', value: 'ten' },
          width: '300px',
          query: new Query(),
          actionComplete: () => false,
          close: this.onClose.bind(this),
        },
      };
    });
  }
  getIndicatorGroup() {
    this.IGService.get().subscribe((result) => {
      this.indiGroupParams = {
        params: {
          allowFiltering: true,
          dataSource: new DataManager(result.data[0].data),
          fields: { text: 'ten_nhom_chi_tieu', value: 'ten_nhom_chi_tieu' },
          width: '300px',
          query: new Query(),
          actionComplete: () => false,
          close: this.onClose.bind(this),
        },
      };
    });
  }
  onClose(args) {
    this.tooltip.close();
  }
  get() {
    this.indicatorService.getIndicator(1, 1000).subscribe((result) => {
      this.indiList = result;
    });
  }
  actionBegin(args) {
    if (args.requestType === 'save') {
      if (args.action == 'add') {
        this.insert(args.data);
      } else if (args.action == 'edit') {
        let id = args.data['ma_dau_vao'];
        let data = {
          ma_hien_thi: args.data['ma_hien_thi'],
          ten_dau_vao: args.data['ten_dau_vao'],
          ngay_tao: args.data['ngay_tao'],
          ma_quyen_nguoi_dung: args.data['ma_quyen_nguoi_dung'],
          ten_quyen_nguoi_dung: args.data['ten_quyen_nguoi_dung'],
          ky_nhap_lieu: args.data['ky_nhap_lieu'],
          ten_don_vi_tinh: args.data['ten_don_vi_tinh'],
          trang_thai: args.data['trang_thai'],
          ten_cay_nhap_lieu: args.data['ten_cay_nhap_lieu'],
          nhom_nganh: args.data['nhom_nganh'],
        };
        this.update(id, data);
      }
    } else if (args.requestType === 'delete') {
      this.delete(args.data[0].ma_dau_vao);
    }
  }
  insert(data) {
    data['trang_thai'] = true;
    this.roleList.forEach((item) => {
      if (item.ten == data['ten_quyen_nguoi_dung']) {
        data['ma_quyen_nguoi_dung'] = item.id;
      }
    });
    this.grdpList.forEach((item) => {
      if (item.ten == data['ten_cay_nhap_lieu']) {
        data['id_cay_nhap_lieu'] = item.id;
      }
    });
    this.indicatorService.insert(data).subscribe(
      (data) => {
        if (data) {
          Swal.fire({
            icon: 'success',
            title: 'Thêm thành công!',
            showConfirmButton: false,
            timer: 2250,
          });
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Thêm không thành công!',
          showConfirmButton: false,
          timer: 2250,
        });
        this.get();
      }
    );
  }
  delete(id) {
    this.indicatorService.delete(id).subscribe(
      (data) => {
        if (data[0] == 'OK') {
          Swal.fire({
            icon: 'success',
            title: 'Xóa thành công!',
            showConfirmButton: false,
            timer: 2250,
          });
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Xóa không thành công!',
          showConfirmButton: false,
          timer: 2250,
        });
        this.get();
      }
    );
  }
  update(id, data) {
    this.roleList.forEach((item) => {
      if (item.ten == data['ten_quyen_nguoi_dung']) {
        data['ma_quyen_nguoi_dung'] = item.id;
      }
    });
    this.grdpList.forEach((item) => {
      if (item.ten == data['ten_cay_nhap_lieu']) {
        data['id_cay_nhap_lieu'] = item.id;
      }
    });
    this.indicatorService.update(id, data).subscribe(
      (result) => {
        if (result.ok == 1) {
          Swal.fire({
            icon: 'success',
            title: 'Cập nhật thành công!',
            showConfirmButton: false,
            timer: 2250,
          });
        }
      },
      (error) => {
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
  public onLoad() {
    this.grid.element.addEventListener(
      'keydown',
      this.debounce((e) => {
        if (e.target.getAttribute('id').indexOf('_searchbar') !== -1) {
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
  dataBound(args) {
    let toolbar;
    this.grid.toolbarModule.getToolbar().childNodes[0].childNodes.forEach(item => {
      if(item['classList'].contains("e-toolbar-left")){
        toolbar = item.childNodes;
      }else if(item['classList'].contains("e-hscroll-bar")){
        toolbar = item.childNodes[0].childNodes[0].childNodes;
      }
    })
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
          element  ['classList'].add('cancel-toolbar-btn');
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
}
