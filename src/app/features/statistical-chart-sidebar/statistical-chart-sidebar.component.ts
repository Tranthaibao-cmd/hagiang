import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ChartService } from '@features/service/chart-service/chart.service';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import Swal from 'sweetalert2';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
@Component({
  selector: 'app-statistical-chart-sidebar',
  templateUrl: './statistical-chart-sidebar.component.html',
  styleUrls: ['./statistical-chart-sidebar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class StatisticalChartSidebarComponent implements OnInit, OnChanges {
  @ViewChild('grid') grid: GridComponent;
  @ViewChild('typeDrop') typeDrop: DropDownListComponent;
  @ViewChild('periodDrop', { static: true }) periodDrop: DropDownListComponent;
  @Output() selectChart = new EventEmitter();
  @Input('chartName') chartName;
  public chartList;
  public pageSettings;
  public commands = [
    {
      type: 'Delete',
      buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' },
    },
  ];
  public editSettings = {
    showDeleteConfirmDialog: true,
    allowDeleting: true,
  };
  public toolbar = ['Search'];
  public searchOptions = { operator: 'startswith' };
  constructor(private chartService: ChartService) {}
  public fields: Object = { text: 'ten_bieu_do', value: '_id' };
  public height: string = '220px';
  ngOnChanges() {}
  ngOnInit(): void {
    var screenWidth = window.innerWidth;
    this.pageSettings = { pageSize: screenWidth > 1366 ? 15 : 10 };
    this.chartService.refresh$.subscribe(() => {
      this.getChart();
    });
    this.getChart();
    
  }
  getChart() {
    this.chartService.getList().subscribe((result) => {
      this.chartList = result;
      console.log(this.chartList);
     // this.fields = this.chartList.ten_bieu_do;
    });
  }
  change(args) {
    // this.chartService.getId().subscribe((result) => {
    this.selectChart.emit(args.value);
    // });
  }
  actionBegin(args) {
    if (args.requestType == 'delete') {
      this.delete(args.data[0]._id);
    }
  }
  delete(id) {
    this.chartService.delete(id).subscribe(
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
          title: 'Xóa thất bại!',
          showConfirmButton: false,
          timer: 2250,
        });
        this.getChart();
      }
    );
  }
  // public onLoad() {
  //   this.grid.element.addEventListener(
  //     'keydown',
  //     this.debounce((e) => {
  //       if (e.target?.getAttribute('id')?.indexOf('_searchbar') !== -1) {
  //         this.grid.search((e.target as HTMLInputElement).value);
  //       }
  //     }, 0)
  //   );
  // }
  public debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
}
