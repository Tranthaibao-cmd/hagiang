import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { StatisticalService } from '@features/service/statistical-service/statistical.service';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import Swal from 'sweetalert2';
import { IndicatorService } from '@features/service/indicator-service/indicator.service';

@Component({
  selector: 'app-statistical-table',
  templateUrl: './statistical-table.component.html',
  styleUrls: ['./statistical-table.component.scss'],
})
export class StatisticalTableComponent implements OnInit, OnChanges {
  @Output() clickChart = new EventEmitter();
  @Input('currentPeriod') currentPeriod;
  @Input('currentYear') currentYear;
  @ViewChild('treegrid') treegrid: TreeGridComponent;

  @Input('reload') reload;
  public toolbar;
  public pageSettings;
  public selectOptions;
  public filterSettings;
  public searchSettings;
  public statisticalList;
  public checkedList = [];
  public editSettings = {
    showDeleteConfirmDialog: true,
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Dialog',
  };
  public data;
  commands: {
    type: string;
    buttonOption: { iconCss: string; cssClass: string };
  }[];
  constructor(
    private statisticalService: StatisticalService,
    private indiService: IndicatorService
  ) {}
  ngOnChanges(): void {
    console.log(this.currentPeriod, this.currentYear)
    this.get();
  }

  ngOnInit(): void {
    this.get();
    this.filterSettings = { type: 'CheckBox' };
    this.selectOptions = { persistSelection: true };
    this.toolbar = [
      {
        text: 'Tạo biểu đồ',
        tooltipText: 'Tạo biểu đồ',
        prefixIcon: 'e-add',
        id: 'chart',
      },
      {
        text: 'Cập nhật',
        tooltipText: 'Cập nhật',
        prefixIcon: 'e-update',
        id: 'update',
      },
      'Search',
    ];
    this.searchSettings = { hierarchyMode: 'Child' };
    this.commands = [
      {
        type: 'Edit',
        buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' },
      },
    ];
    var screenWidth = window.innerWidth;
    this.pageSettings = { pageSize: screenWidth > 1366 ? 15 : 10 };
  }
  get() {
    this.statisticalService
      .getStatistical(this.currentYear, this.currentPeriod)
      .subscribe((result) => {
        this.statisticalList = result;
      });
  }
  actionBegin(args) {
    if (args.requestType === 'save') {
      let data = {
        ma_chi_tieu: args.data['ma_chi_tieu'],
        nam: this.currentYear,
        ky_nhap_lieu: this.currentPeriod,
        gia_tri: args.data['gia_tri'],
      };
      this.statisticalService.updateStatistical(data).subscribe((result) => {
        this.get();
      });
    } else if (args.requestType === 'delete') {
    }
  }
  clickHandler(args: ClickEventArgs): void {
    if (args.item.id === 'chart') {
      let chartList = [];
      this.treegrid.getSelectedRecords().forEach((item) => {
        chartList.push(item['ma_chi_tieu']);
      });
      if (chartList?.length == 0) {
        Swal.fire({
          icon: 'error',
          title: 'Không có dữ liệu để tạo biểu đồ!',
          showConfirmButton: false,
          timer: 2250,
        });
      } else {
        this.clickChart.emit(chartList);
      }
      // this.statisticalService.getChart(chartList).subscribe((result) => {
      //   this.clickChart.emit(result.data);
      // });
    }
    if (args.item.id === 'update') {
      this.indiService
        .nhapLieuCalculate(this.currentYear, '123')
        .subscribe((result) => {
          this.reload = Math.random();
          this.get();
        });
    }
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
        case 'Tạo biểu đồ':
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
        case 'Cập nhật':
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
}
