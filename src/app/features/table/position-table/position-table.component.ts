import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { PositionService } from '@features/service/position-service/position.service';
import { RoleService } from '@features/service/role-service/role.service';
import { checkResource } from '@shared/share';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { closest } from '@syncfusion/ej2-base';
import { level } from './level';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-position-table',
  templateUrl: './position-table.component.html',
  styleUrls: ['./position-table.component.scss'],
})
export class PositionTableComponent implements OnInit {
  public editSettings;
  public toolbar;
  public pageSettings;
  public positionList;
  public selectedId;
  public searchSettings;
  public level = level;
  public LevelParams = {
    params: {
      allowFiltering: true,
      dataSource: new DataManager(level),
      fields: { text: 'text', value: 'value' },
      query: new Query(),
      actionComplete: () => false,
    },
  };
  public position;
  public width = 250;
  public selected = '';
  public expandedList = [];
  public selectedPosition;
  public commands;
  @ViewChild('treegrid') treegrid: TreeGridComponent;
  constructor(
    private positionService: PositionService,
    private authService: AuthenticationService,
    private roleService: RoleService,
    private router: Router
  ) {
    checkResource(
      'Tài nguyên Cấu hình - Chức vụ',
      this.authService,
      this.router
    );
  }

  ngOnInit(): void {
    this.positionService.refresh$.subscribe(() => {
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
    this.commands = [
      {
        buttonOption: {
          content: 'Quyền tài nguyên',
          cssClass: 'e-flat',
          iconCss: 'e-edit e-icons',
          click: this.onClick.bind(this),
        },
      },
    ];
    this.searchSettings = { hierarchyMode: 'Child', operator: 'startswith' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'];
    var screenWidth = window.innerWidth;
    this.position = { X: (screenWidth - this.width) / 2, Y: 100 };
    this.pageSettings = { pageSize: screenWidth > 1366 ? 15 : 10 };
  }
  public onClick = (args: Event) => {
    let rowIndex: number = (<HTMLTableRowElement>(
      closest(args.target as Element, '.e-row')
    )).rowIndex;
    let data: Object = this.treegrid.getCurrentViewRecords();
    this.selectedPosition = data[rowIndex].id;
  };
  get() {
    this.positionService.get().subscribe((result) => {
      if (this.expandedList?.length > 0) {
        this.positionList = this.setExpand(result);
      } else {
        this.positionList = result;
      }
    });
  }
  getLevelName(id){
    if(id) return level.filter(l => l.value == id)[0].text
    else return ''
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
          let position = {
            ten: args.data['ten'],
            mo_ta: args.data['mo_ta'] || '',
            cap: args.data['cap'],
            parent_id: this.selected,
          };
          this.insert(position);
          this.selected = '';
        } else if (args.action == 'edit') {
          let position = {
            ten: args.data['ten'],
            cap: args.data['cap'],
            mo_ta: args.data['mo_ta'],
          };
          let id = args.data['id'];
          this.update(id, position);
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
  actionComplete(args) {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      if (this.selected != undefined) {
        args.form.ej2_instances[0].addRules('mo_ta', {
          required: [true, 'Mã là bắt buộc'],
        });
      } else {
        args.form.ej2_instances[0].removeRules('mo_ta');
      }
    }
  }
  created() {
    this.treegrid.enableCollapseAll = true;
  }
  insert(position) {
    this.positionService.insert(position).subscribe(
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
    this.positionService.delete(id).subscribe(
      (result) => {
        if (result[0] == 'OK') {
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
  update(id, position) {
    this.positionService.update(id, position).subscribe(
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
  rowSelected(args) {
    this.selectedId = args.data.id;
  }
  rowDeselected(args) {
    this.selectedId = '';
  }
  closeDialog(e) {
    this.selectedPosition = undefined;
  }
  public onLoad() {
    this.treegrid.element.addEventListener(
      'keydown',
      this.debounce((e) => {
        if (
          e.target.getAttribute('id') &&
          e.target.getAttribute('id')?.indexOf('_searchbar') !== -1
        ) {
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
