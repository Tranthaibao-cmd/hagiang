import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { VirtualScrollService } from '@syncfusion/ej2-angular-grids';
import { IndicatorService } from '@features/service/indicator-service/indicator.service';
import { checkType } from './checkType';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-input-grdp-table',
  templateUrl: './input-grdp-table.component.html',
  styleUrls: ['./input-grdp-table.component.scss'],
  providers: [VirtualScrollService],
})
export class InputGrdpTableComponent implements OnInit, OnChanges {
  @Input('currentPeriod') currentPeriod;
  @Input('currentYear') currentYear;
  @Input('currentType') currentType;

  public editSettings;
  public toolbar;
  public pageSettings;
  public grdpList;
  public grdpHeader;
  public selectedId;
  public searchSettings;
  public expandedList = [];
  public position;
  public width = 250;
  public selected = '';
  public input;
  public typeArray = checkType;
  @ViewChild('treegrid') treegrid: TreeGridComponent;
  constructor(private indiService: IndicatorService) {}
  ngOnChanges(): void {
    this.input = {
      ky_nhap_lieu: this.currentPeriod,
      nam: this.currentYear,
      id_cay_nhap_lieu: this.currentType,
    };
    this.get();
  }

  ngOnInit(): void {
    this.indiService.refresh$.subscribe(() => {
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
    this.toolbar = ['Edit', 'Update', 'Cancel', 'Search'];
    var screenWidth = window.innerWidth;
    this.pageSettings = { pageSize: screenWidth > 1366 ? 15 : 10 };
    this.position = { X: (screenWidth - this.width) / 2, Y: 100 };
  }
  get() {
    if (this.input) {
      this.indiService.getNhapLieu(this.input).subscribe((result) => {
        this.grdpList = result.data.data;
        this.grdpHeader = result.data.header;
      });
    }
  }
  getExpanded() {
    this.expandedList = [];
    for (let i = 0; i < this.treegrid.flatData.length; i++) {
      this.expandedList.push({
        id: this.treegrid.flatData[i]['id'],
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
        this.getExpanded();
        let data = args.data;
        let id = args.data['_id'];
        let ten = args.data['ten'];
        this.typeArray.forEach((item) => {
          delete data[item];
        });
        for (let key in data) {
          this.update({
            ma_dau_vao: key,
            ten_dau_vao: ten,
            gia_tri: data[key],
            ky_nhap_lieu: this.currentPeriod,
            nam: this.currentYear,
            id_cay_nhap_lieu: id,
          });
        }
        break;
    }
  }
  update(data) {
    this.indiService.updateNhapLieu(data).subscribe(
      (result) => {
        if (result.ok == 1) {
          this.alertMessage('Cập nhật thành công!');
        } else {
          this.alertMessage(result.message);
        }
      },
      (error) => {
        this.alertMessage('Cập nhật không thành công!');
        this.get();
      }
    );
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
  alertMessage(text) {
    Swal.fire({
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 2250,
    });
  }
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
