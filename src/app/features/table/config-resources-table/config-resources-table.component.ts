import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { formatDate } from '@angular/common';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { ResourcesService } from '@features/service/resources-service/resources.service';
import { Observable } from 'rxjs/Observable';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { checkResource } from '@shared/share';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config-resources-table',
  templateUrl: './config-resources-table.component.html',
  styleUrls: ['./config-resources-table.component.scss'],
})
export class ConfigResourcesTableComponent implements OnInit {
  @ViewChild('backgroundgrid', { static: true }) backgroundgrid: ElementRef;
  @ViewChild('grid') grid: GridComponent;
  public currentDate = new Date();
  public currentDateString;
  public selectedName;
  public resourcesList: Observable<DataStateChangeEventArgs>;
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
    private ResourcesService: ResourcesService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.currentDateString = formatDate(
      this.currentDate,
      'dd-MM-yyyy',
      'en-US'
    );

    checkResource(
      'Tài nguyên Cấu hình - Tài nguyên',
      this.authService,
      this.router
    );
  }
  ngOnInit(): void {
    this.ResourcesService.refresh$.subscribe(() => {
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
    this.ResourcesService.get().subscribe((result) => {
      this.resourcesList = result;
    });
  }
  actionBegin(args) {
    if (args.requestType === 'save') {
      if (args.action == 'add') {
        this.insert({
          ten_tai_nguyen: args.data['ten_tai_nguyen'],
          trang_thai: true,
        });
      } else if (args.action == 'edit') {
        this.update(args.data['_id'], {
          ten_tai_nguyen: args.data['ten_tai_nguyen'],
        });
      }
    } else if (args.requestType === 'delete') {
      this.delete(args.data[0]._id);
    }
  }
  insert(data) {
    this.ResourcesService.insert(data).subscribe(
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
  update(id, data) {
    this.ResourcesService.update(id, data).subscribe(
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
  delete(id) {
    this.ResourcesService.delete(id).subscribe(
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
