import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { UnitService } from '@features/service/unit-service/unit.service';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs/Observable';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { checkResource } from '@shared/share';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config-unit-table',
  templateUrl: './config-unit-table.component.html',
  styleUrls: ['./config-unit-table.component.scss'],
})
export class ConfigUnitTableComponent implements OnInit {
  @ViewChild('backgroundgrid', {static: true}) backgroundgrid: ElementRef;
  @ViewChild('grid') grid: GridComponent;
  public selectedName;
  public unitList: Observable<DataStateChangeEventArgs>;
  public toolbar;
  public pageSettings;
  public editSettings;
  public position;
  public width = 250;
  public status = [
    { name: 'true', value: true },
    { name: 'false', value: false },
  ];
  StatusParams;

  constructor(
    private UnitService: UnitService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    checkResource(
      'Tài nguyên Cấu hình - Đơn vị tính',
      this.authService,
      this.router
    );
  }
  ngOnInit(): void {
    this.UnitService.refresh$.subscribe(() => {
      this.get();
    });
    this.get();
    this.StatusParams = {
      params: {
        allowFiltering: false,
        dataSource: new DataManager(this.status),
        fields: { text: 'name', value: 'value' },
        query: new Query(),
        actionComplete: () => false,
      },
    };
    var screenWidth = window.innerWidth;
    this.editSettings = {
      showDeleteConfirmDialog: true,
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
    };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'];
    this.pageSettings = { pageSize: screenWidth > 1366 ? 15 : 10 };
    this.position = { X: (screenWidth - this.width) / 2, Y: 100 };
  }
  get() {
    this.UnitService.get().subscribe((result) => {
      this.unitList = result.data[0].data;
    });
  }
  actionBegin(args) {
    if (args.requestType === 'save') {
      if (args.action == 'add') {
        this.insert(args.data);
      } else if (args.action == 'edit') {
        let data = {
          id: args.data['id'],
          ten_don_vi_tinh: args.data['ten_don_vi_tinh'],
        };
        this.update(data);
      }
    } else if (args.requestType === 'delete') {
      this.delete(args.data[0].id);
    }
  }
  insert(data) {
    let unit = { ten_don_vi_tinh: data.ten_don_vi_tinh };
    this.UnitService.insert(unit).subscribe(
      (data) => {
        if (data.code == 201) {
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
    this.UnitService.delete(id).subscribe(
      (data) => {
        if (data.code == 200) {
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
  update(data) {
    this.unitList.forEach((item) => {
      item['ten'] == data['ten_don_vi_tinh'];
    });
    let id = data.id;
    delete data.id;
    this.UnitService.update(id, data).subscribe(
      (result) => {
        if (result.code == 200) {
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
    });   if ((this.grid.dataSource as any)?.length === 0) {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'none';
    } else {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'block';
    }
  }
}
