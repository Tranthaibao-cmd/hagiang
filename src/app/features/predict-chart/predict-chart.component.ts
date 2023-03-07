import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ChartService } from '@features/service/chart-service/chart.service';
import {
  ChartComponent,
  ChartTheme,
  ILoadedEventArgs,
} from '@syncfusion/ej2-angular-charts';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Browser } from '@syncfusion/ej2-base';
import { environment } from 'src/environments/environment';
import { chart } from './chart';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-predict-chart',
  templateUrl: './predict-chart.component.html',
  styleUrls: ['./predict-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PredictChartComponent implements OnInit, OnChanges {
  @Input('data') data;
  @ViewChild('chart') chart: ChartComponent;
  @ViewChild('bggrid', {static: true}) bggrid: ElementRef;
  @ViewChild('grid') grid: GridComponent;
  public length;
  public chartData;
  public chartForm: FormGroup;
  public submitted = false;
  public position;
  public pageSettings;
  public widthDialog = 250;
  public type = { text: 'Biểu đồ đường', value: 'Line' };
  public chartType = chart.chartType;
  public legendSettings: Object = chart.legendVisible;
  public primaryXAxis: Object = chart.primaryXAxis;
  public primaryYAxis: Object = chart.primaryYAxis;
  public chartArea: Object = chart.chartArea;
  public width: string = Browser.isDevice ? '100%' : '100%';
  public marker: Object = chart.marker;
  public zoomSettings: Object = chart.zoomSettings;
  public tooltip: Object = chart.tooltip;

  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme>(
      (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
        /-dark/i,
        'Dark'
      )
    );
  }
  public title: string = 'Biểu đồ thống kê';
  constructor(private fb: FormBuilder, private chartService: ChartService) {}
  ngOnChanges(): void {
    this.length = [];
    this.length.push(this.data?.length);
    console.log('data', this.data)

  }
  ngOnInit(): void {
    this.length = [];
    if (this.data?.length > 0) {
      this.length.push(this.data.length);
    }
    var screenWidth = window.innerWidth;
    this.pageSettings = { pageSize: screenWidth > 1366 ? 15 : 10 };
    this.position = { X: (screenWidth - this.widthDialog) / 2, Y: 100 };

  }
  get chartFormControl() {
    return this.chartForm.controls;
  }

  get Name(): AbstractControl {
    return this.chartForm.get('name');
  }
  getChart(id) {
    this.chartService.getId(id).subscribe((result) => {
      this.chartData = result[0];
    });
  }
  downloadChart(id) {
    this.chartService.exportChart(id).subscribe((result) => {
      window.location.href = environment.baseURL + '/' + result;
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.chartData._id) {
      this.update(this.chartData._id, {
        ten_bieu_do: this.chartForm.value.name,
        mo_ta: this.chartForm.value.desc,
      });
    } else {
      this.insert({
        ten_bieu_do: this.chartForm.value.name,
        mo_ta: this.chartForm.value.desc,
        data: this.chartData.data,
      });
    }
  }
  insert(chart) {
    this.chartService.insert(chart).subscribe(
      (result) => {
        if (result[1] == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Thêm thành công!!',
            showConfirmButton: false,
            timer: 1500
          })

          this.title = 'Biểu đồ ' + this.chartForm.value.name;
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Thêm không thành công!!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    );
  }
  update(id, chart) {
    this.chartService.update(id, chart).subscribe(
      (result) => {
        if (result.ok == 1) {
          Swal.fire({
            icon: 'success',
            title: 'Cập nhật thành công!!',
            showConfirmButton: false,
            timer: 1500
          })
          this.title = 'Biểu đồ ' + this.chartForm.value.name;
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Cập nhật không thành công!!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    );
  }
  changeChartType(e) {
    this.type = e.itemData;
    // if (this.type.value == 'Line') {
    //   this.marker = {
    //     visible: true,
    //     height: 5,
    //     width: 5,
    //   };
    // }
    // if (this.type.value == 'Column') {
    //   this.marker = {
    //     visible: true,
    //     height: 10,
    //     width: 10,
    //   };
    // }
    // if (this.type.value == 'StackingArea100') {
    //   this.marker = {
    //     visible: true,
    //     height: 5,
    //     width: 5,
    //   };
    // }
  }
  getYear(date){
    return new Date(date).getFullYear();
  }
  // ChartNameValidator() {
  //   let regex =
  //     /^([\wàáảạãâầấẩậẫăằắẳặẵđèéẻẹẽêềếểệễòóỏọõôồốổộỗơờớởợỡìíỉịĩỳýỷỵỹùúũủụưứừửựữÀÁẢẠÃÂẦẤẨẬẪĂẰẮẲẶẴÈÉẺẸẼÊỀẾỂỄỆÒÓỎỌÕÔỔỐỒỘỖƠỜỚỞỠỢÌÍỈỊĨỲÝỶỴỸÙÚỦỤŨƯỨỪỬỮỰ]+\s)*[\wàáảạãâầấẩậẫăằắẳặẵđèéẻẹẽêềếểệễòóỏọõôồốổộỗơờớởợỡìíỉịĩỳýỷỵỹùúũủụưứừửựữÀÁẢẠÃÂẦẤẨẬẪĂẰẮẲẶẴÈÉẺẸẼÊỀẾỂỄỆÒÓỎỌÕÔỔỐỒỘỖƠỜỚỞỠỢÌÍỈỊĨỲÝỶỴỸÙÚỦỤŨƯỨỪỬỮỰ]+$/;
  //   return (control: FormControl): null | Object => {
  //     return regex.test(control.value)
  //       ? null
  //       : {
  //           NameError: true,
  //         };
  //   };
  // }
  public onLoad() {
    this.grid.element.addEventListener(
      'keydown',
      this.debounce((e) => {
        if (
          e.target.getAttribute('id') &&
          e.target.getAttribute('id')?.indexOf('_searchbar') !== -1
        ) {
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
