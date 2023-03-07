import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { IndicatorGroupService } from '@features/service/indicator-group-service/indicator-group.service';
import { Observable } from 'rxjs/Observable';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { checkResource } from '@shared/share';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config-indicator-group-table',
  templateUrl: './config-indicator-group-table.component.html',
  styleUrls: ['./config-indicator-group-table.component.scss'],
})
export class ConfigIndicatorGroupTableComponent implements OnInit {
  @ViewChild('backgroundgrid', { static: true }) backgroundgrid: ElementRef;
  @ViewChild('grid') grid: GridComponent;
  public selectedName;
  public unitList: Observable<DataStateChangeEventArgs>;
  public toolbar;
  public pageSettings;
  public editSettings;
  public position;
  public width = 250;

  constructor(
    private IGService: IndicatorGroupService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    checkResource(
      'Tài nguyên Cấu hình - Nhóm chỉ tiêu',
      this.authService,
      this.router
    );
  }
  ngOnInit(): void {
    this.IGService.refresh$.subscribe(() => {
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
    this.IGService.get().subscribe((result) => {
      this.unitList = result.data[0].data;
    });
  }
  actionBegin(args) {
    if (args.requestType === 'save') {
      if (args.action == 'add') {
        this.insert({ ten_nhom_chi_tieu: args.data['ten_nhom_chi_tieu'] });
      } else if (args.action == 'edit') {
        this.update(args.data['id'], {
          ten_nhom_chi_tieu: args.data['ten_nhom_chi_tieu'],
        });
      }
    } else if (args.requestType === 'delete') {
      this.delete(args.data[0].id);
    }
  }
  insert(data) {
    this.IGService.insert(data).subscribe(
      (data) => {
        if (data.code == 201) {
          Swal.fire({
            icon: 'success',
            title: 'Thêm thành công!',
            showConfirmButton: false,
            timer: 2250,
          });
        }else if(data.code == 409){
          Swal.fire({
            icon: 'error',
            title: data?.message ? data.message : 'Thêm không thành công!',
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
    this.IGService.delete(id).subscribe(
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
  update(id, data) {
    this.IGService.update(id, data).subscribe(
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
