import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { DistrictService } from '@features/service/district-service/district.service';
import { checkResource } from '@shared/share';
import {
  DataStateChangeEventArgs,
  GridComponent,
} from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs/Observable';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config-district-table',
  templateUrl: './config-district-table.component.html',
  styleUrls: ['./config-district-table.component.scss'],
})
export class ConfigDistrictTableComponent implements OnInit {
  @ViewChild('grid') grid: GridComponent;
  @ViewChild('backgroundgrid', { static: true }) backgroundgrid: ElementRef;
  public currentDate = new Date();
  public currentDateString;
  public selectedName;
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
  districtList: Observable<DataStateChangeEventArgs>;

  constructor(
    private DistrictService: DistrictService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    checkResource('Tài nguyên Cấu hình - Phòng', this.authService, this.router);
  }
  ngOnInit(): void {
    this.DistrictService.refresh$.subscribe(() => {
      this.get();
    });
    this.get();
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
  get() {
    this.DistrictService.get().subscribe((result) => {
      this.districtList = result;
    });
  }
  actionBegin(args) {
    if (args.requestType === 'save') {
      if (args.action == 'add') this.insert(args.data['ten_phong'], true);
      else if (args.action) this.update(args.data._id, args.data['ten_phong']);
    } else if (args.requestType === 'delete') {
      this.delete(args.data[0]._id);
    }
  }
  insert(name, state) {
    this.DistrictService.insert(name, state).subscribe(
      (result) => {
        if (result.code == 201) {
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
        // this.get();
      }
    );
  }
  update(id, name) {
    this.DistrictService.update(id, name).subscribe(
      (result) => {
        Swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công!',
          showConfirmButton: false,
          timer: 2250,
        });
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
  delete(id) {
    this.DistrictService.delete(id).subscribe(
      (result) => {
        if (result.code == 200) {
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
