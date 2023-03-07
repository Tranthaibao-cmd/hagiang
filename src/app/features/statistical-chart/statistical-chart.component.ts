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
import { chart } from '../report/report/chart';
import Swal from 'sweetalert2';
import { StatisticalService } from '@features/service/statistical-service/statistical.service';
import { StatisticalChartSidebarComponent } from '@features/statistical-chart-sidebar/statistical-chart-sidebar.component';
@Component({
  selector: 'app-statistical-chart',
  templateUrl: './statistical-chart.component.html',
  styleUrls: ['./statistical-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StatisticalChartComponent implements OnInit, OnChanges {
  @Input('list') list : StatisticalChartSidebarComponent;
  @Input('data_id') data_id;
  @ViewChild('chart') chart: ChartComponent;
  @ViewChild('bggrid', { static: true }) bggrid: ElementRef;
  @ViewChild('grid') grid: GridComponent;
  public length;
  public from_time;
  public to_time;
  public dataSeparation: boolean = false;
  public chartData;
  public chartForm: FormGroup;
  public submitted = false;
  public position;
  public pageSettings;
  public widthDialog = 250;
  public typeOfId;
  public type = { text: 'Biểu đồ đường', value: 'Line' };
  public chartType = chart.chartType;
  public legendSettings: Object = chart.legendVisible;
  public primaryXAxis: Object = chart.primaryXDateTimeAxis;
  public primaryYAxis: Object = chart.primaryYAxis;
  public chartArea: Object = chart.chartArea;
  public width: string = Browser.isDevice ? '100%' : '100%';
  public marker: Object = chart.marker;
  public zoomSettings: Object = chart.zoomSettings;
  public tooltip: Object = chart.tooltip;

  date = new Date();

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
  constructor(
    private fb: FormBuilder,
    private chartService: ChartService,
    private statisticalService: StatisticalService
  ) {}
  ngOnChanges(): void {
    this.createForm('');
    this.length = [];
    this.typeOfId = typeof this.data_id == 'object';
    console.log('Select chart');
    if (this.data_id) {
      if (this.typeOfId) {
        this.statisticalService.getChart(this.data_id, undefined, undefined, undefined).subscribe((result) => {
          console.log('object: ', result);
          this.chartData = {
            ten_bieu_do: '',
            mo_ta: result?.mo_ta ? result.mo_ta : '',
            data: result.data,
          };
          this.createForm(result.mo_ta);
          this.title = 'Biểu đồ ' + this.chartData.ten_bieu_do;
          this.length.push(this.chartData.data?.length);
          this.formatDate();
        });
      } else {
        this.chartService.getId(this.data_id).subscribe((result) => {

          this.chartData = result[0];
          this.primaryXAxis = chart.primaryXDateTimeAxis;
          // console.log(result[0])
          if ( result[0].param ) {
            this.from_time = result[0].param.from_time
            this.to_time = result[0].param.to_time

            this.dataSeparation = result[0].param.tach_nam

            if (this.dataSeparation == true) {
              this.primaryXAxis = chart.primaryXMonthTimeAxis;
              this.switchToMonth()
            }
            
            // console.log(this.chartData)
          } else {
            this.formatDate();
          }

          this.chartForm.patchValue({
            name: result[0].ten_bieu_do,
            desc: result[0].mo_ta,
          });

          this.title = 'Biểu đồ ' + this.chartData.ten_bieu_do;
          this.length = [this.chartData.data?.length];

        });
      }
    }
  }
  ngOnInit(): void {
    this.createForm('');
    var screenWidth = window.innerWidth;
    this.pageSettings = { pageSize: screenWidth > 1366 ? 15 : 10 };
    this.position = { X: (screenWidth - this.widthDialog) / 2, Y: 100 };
  }

  get chartFormControl() {
    return this.chartForm.controls;
  }

  createForm(mo_ta) {
    this.chartForm = this.fb.group({
      name: ['', [Validators.required, this.ChartNameValidator()]],
      desc: [mo_ta],
    });
  }

  formatDate() {
    for (var idx in this.chartData.data) {
      var line = this.chartData.data[idx];
      for (var _date_idx in line['chartdata']) {
        var _date = line['chartdata'][_date_idx]['ngay_nhap_lieu'];
        var parts;
        var dt;
        if (_date.includes('T')) {
          parts = _date.split('T')[0].split('-');
          dt = new Date(
            parseInt(parts[0], 10),
            parseInt(parts[1], 10) - 1,
            parseInt(parts[2], 10)
          );
        } else {
          parts = _date.split('-');
          dt = new Date(
            parseInt(parts[2], 10),
            parseInt(parts[1], 10) - 1,
            parseInt(parts[0], 10)
          );
        }
        // console.log('dfff',dt)
        this.chartData.data[idx]['chartdata'][_date_idx]['ngay_nhap_lieu'] = dt;
      }
    }
    // console.log(this.chartData.data);
  }
  switchToMonth() {
    for (var idx in this.chartData.data) {
      var line = this.chartData.data[idx];
      for (var _date_idx in line['chartdata']) {
        var thang_nhap_lieu = this.chartData.data[idx]['chartdata'][_date_idx]['thang_nhap_lieu'];
        // console.log('dsf',this.chartData.data[idx]['chartdata'][_date_idx])
        var t_ngay_nhap_lieu = this.chartData.data[idx]['chartdata'][_date_idx]['ngay_nhap_lieu']
        
        if (t_ngay_nhap_lieu.includes('T')) {
          var parts = t_ngay_nhap_lieu.split('T')[0].split('-');
          thang_nhap_lieu = parts[1] - 1
        }

        this.chartData.data[idx]['chartdata'][_date_idx]['ngay_nhap_lieu'] = thang_nhap_lieu;
        // console.log('sdf', thang_nhap_lieu)
      }
    }
  }

  get Name(): AbstractControl {
    return this.chartForm.get('name');
  }
  get Desc(): AbstractControl {
    return this.chartForm.get('desc');
  }

  getChart(id) {
    this.chartService.getId(id).subscribe((result) => {
      console.log('Get chart by ID', result)
      this.chartData = result[0];
      // this.chartData
      this.primaryXAxis = chart.primaryXDateTimeAxis;
      // console.log('cvsdd', result[0])
      if ( result[0].param ) {
        // console.log('cvsdd', result[0].param)
        this.from_time = result[0].param.from_time
        this.to_time = result[0].param.to_time

        this.dataSeparation = result[0].param.tach_nam

        if (this.dataSeparation == true) {
          this.primaryXAxis = chart.primaryXMonthTimeAxis;
          this.switchToMonth()
        }
        
      } else {
        this.formatDate();
      }


    });
  }
  downloadChart(id) {
    this.chartService.exportChart(id).subscribe((result) => {
      window.location.href = environment.baseURL + '/' + result;
    });
  }
  filter() {
    let from = this.from_time.split('-').reverse().join('-');
    let to = this.to_time.split('-').reverse().join('-');
    this.statisticalService
      .getChart(this.data_id, from, to, this.dataSeparation)
      .subscribe((result) => {

        this.chartData = {
          ten_bieu_do: '',
          mo_ta: result.mo_ta,
          data: result.data,
        };

        this.length = [this.chartData.data?.length]
        this.primaryXAxis = chart.primaryXDateTimeAxis;

        if (this.dataSeparation) {
          this.primaryXAxis = chart.primaryXMonthTimeAxis;
          this.switchToMonth();
        } else {
          this.formatDate();
        }
        this.createForm(result.mo_ta);
        // this.title = 'Biểu đồ ' + this.chartData.ten_bieu_do;

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
        param: {
          'tach_nam': this.dataSeparation,
          'from_time': this.from_time,
          'to_time': this.to_time,
        }
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
            timer: 1500,
          });

          this.title = 'Biểu đồ ' + this.chartForm.value.name;
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Thêm không thành công!!',
          showConfirmButton: false,
          timer: 1500,
        });
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
            timer: 1500,
          });
          this.title = 'Biểu đồ ' + this.chartForm.value.name;
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Cập nhật không thành công!!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
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
       this.list.getChart();
      }
    );
  }
  changeChartType(e) {
    this.type = e.itemData;
    if (this.type.value == 'Line') {
      this.marker = {
        visible: true,
        height: 5,
        width: 5,
      };
    }
    if (this.type.value == 'Column') {
      this.marker = {
        visible: false,
        height: 10,
        width: 10,
      };
    }
    if (this.type.value == 'StackingArea100') {
      this.marker = {
        visible: false,
        height: 5,
        width: 5,
      };
    }
  }
  ChartNameValidator() {
    let regex =
      /^([\wàáảạãâầấẩậẫăằắẳặẵđèéẻẹẽêềếểệễòóỏọõôồốổộỗơờớởợỡìíỉịĩỳýỷỵỹùúũủụưứừửựữÀÁẢẠÃÂẦẤẨẬẪĂẰẮẲẶẴÈÉẺẸẼÊỀẾỂỄỆÒÓỎỌÕÔỔỐỒỘỖƠỜỚỞỠỢÌÍỈỊĨỲÝỶỴỸÙÚỦỤŨƯỨỪỬỮỰ]+\s)*[\wàáảạãâầấẩậẫăằắẳặẵđèéẻẹẽêềếểệễòóỏọõôồốổộỗơờớởợỡìíỉịĩỳýỷỵỹùúũủụưứừửựữÀÁẢẠÃÂẦẤẨẬẪĂẰẮẲẶẴÈÉẺẸẼÊỀẾỂỄỆÒÓỎỌÕÔỔỐỒỘỖƠỜỚỞỠỢÌÍỈỊĨỲÝỶỴỸÙÚỦỤŨƯỨỪỬỮỰ]+$/;
    return (control: FormControl): null | Object => {
      return regex.test(control.value)
        ? null
        : {
            NameError: true,
          };
    };
  }
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
