import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '@features/service/role-service/role.service';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { Observable } from 'rxjs/Observable';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { checkResource } from '@shared/share';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config-user-group-table',
  templateUrl: './config-user-group-table.component.html',
  styleUrls: ['./config-user-group-table.component.scss'],
})
export class ConfigUserGroupTableComponent implements OnInit {
  @ViewChild('backgroundgrid', {static: true}) backgroundgrid: ElementRef;
  public commands;
  public editSettings;
  public toolbar;
  public pageSettings;
  public roleList: Observable<DataStateChangeEventArgs>;
  public selectedId;
  public searchSettings;
  public expandedList = [];
  public position;
  public width = 250;
  public selected = '';
  @ViewChild('treegrid') treegrid: TreeGridComponent;
  constructor(
    private roleService: RoleService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    checkResource(
      'Tài nguyên Cấu hình - Nhóm người dùng',
      this.authService,
      this.router
    );
  }
  ngOnInit(): void {
    this.roleService.refresh$.subscribe(() => {
      this.get();
    });
    this.get();
    this.editSettings = {
      showDeleteConfirmDialog: true,
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      mode: 'Row',
    };
    this.searchSettings = { hierarchyMode: 'Child' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'];
    var screenWidth = window.innerWidth;
    this.pageSettings = { pageSize: screenWidth > 1366 ? 15 : 10 };
    this.position = { X: (screenWidth - this.width) / 2, Y: 100 };
  }
  get() {
    this.roleService.getRole().subscribe((result) => {
      if (this.expandedList?.length > 0) {
        this.roleList = this.setExpand(result);
      } else {
        this.roleList = result;
      }
    });
  }
  getExpanded() {
    this.expandedList = [];
    for (let i = 0; i < this.treegrid.flatData.length; i++) {
      this.expandedList.push({
        id: this.treegrid.flatData[i]['id'],
        ten: this.treegrid.flatData[i]['ten'],
        expanded: this.treegrid.flatData[i]['expanded'],
      });
    }
  }
  setExpand(list) {
    for (let i = 0; i < list?.length; i++) {
      let x = this.expandedList.filter((x) => x['id'] == list[i]['id']);
      if (x.length > 0) {
        list[i]['expanded'] = x[0]['expanded'];
      } else {
        list[i]['expanded'] = false;
      }
      if (list[i].children?.length) {
        this.setExpand(list[i].children);
      }
    }
    return list;
  }
  actionBegin(args) {
    switch (args.requestType) {
      case 'save':
        this.treegrid.enableCollapseAll = false;
        this.getExpanded();
        if (args.action == 'add') {
          if (this.selected == undefined) {
            this.selected = '';
          }
          let role = {
            ten: args.data['ten'],
            ma_hanh_chinh: args.data['ma_hanh_chinh'],
            parent_id: this.selected,
          };
          this.insert(role);
          this.selected = '';
        } else if (args.action == 'edit') {
          let role = {
            ten: args.data['ten'],
            ma_hanh_chinh: args.data['ma_hanh_chinh'],
          };
          let id = args.data['id'];
          this.update(id, role);
        }
        break;
      case 'add':
        if (this.selectedId != undefined) {
          this.selected = this.selectedId;
        }
        break;
      case 'delete':
        this.treegrid.enableCollapseAll = false;
        this.getExpanded();
        this.delete(args.data[0].id);
        break;
      case 'cancel':
        this.selected = '';
        break;
    }
  }
  actionComplete(args) {}
  insert(role) {
    this.roleService.insert(role).subscribe(
      (result) => {
        if (result) {
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
    this.roleService.delete(id).subscribe(
      (result) => {
        if (result[0] == 'OK') {
          Swal.fire({
            icon: 'success',
            title: 'Xóa thành công!',
            showConfirmButton: false,
            timer: 2250,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Xóa không thành công!',
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
  update(id, role) {
    this.roleService.update(id, role).subscribe(
      (result) => {
        if (result.ok == 1) {
          Swal.fire({
            icon: 'success',
            title: 'Cập nhật thành công!',
            showConfirmButton: false,
            timer: 2250,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Cập nhật không thành công!',
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
  created(e) {
    this.treegrid.enableCollapseAll = true;
  }
  rowSelected(args) {
    this.selectedId = args.data.id;
  }
  rowDeselected(args) {
    this.selectedId = '';
  }
  public onLoad() {
    this.treegrid.element.addEventListener(
      'keydown',
      this.debounce((e) => {
        if (e.target.getAttribute('id').indexOf('_searchbar') !== -1) {
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
    this.treegrid.toolbarModule.getToolbar().childNodes[0].childNodes.forEach(item => {
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
    if ((this.treegrid.dataSource as any)?.length === 0) {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'none';
    } else {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'block';
    }
  }
}
