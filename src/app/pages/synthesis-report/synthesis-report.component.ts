import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartService } from '@features/service/chart-service/chart.service';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { chart } from './chart';
import { Browser, EmitType } from '@syncfusion/ej2-base';
import {
  ChartComponent,
  ChartTheme,
  ILoadedEventArgs,
} from '@syncfusion/ej2-angular-charts';
import { tool } from './tool';
import { ReportService } from '@features/service/report-service/report.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IndicatorService } from '@features/service/indicator-service/indicator.service';
import { IndicatorMeasureService } from '@features/service/indicator-measure/indicator-measure.service';
import { StatisticalService } from '@features/service/statistical-service/statistical.service';
import { getVal } from '@syncfusion/ej2-angular-inputs';
import { RoleService } from '@features/service/role-service/role.service';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-synthesis-report',
  templateUrl: './synthesis-report.component.html',
  styleUrls: ['./synthesis-report.component.scss'],
})
export class SynthesisReportComponent implements OnInit {
  @ViewChild('InputDialog') InputDialog: DialogComponent;
  @ViewChild('treegrid') treegrid: TreeGridComponent;
  @ViewChild('Editor')
  public pageSettings: PageSettingsModel;
  public editor: RichTextEditorComponent;
  public allowEdit = false;
  public tools: object = tool;
  public list;
  public listChart;
  public listReport;
  public listYear = [
    '2016-2017',
    '2017-2018',
    '2018-2019',
    '2019-2020',
    '2020-2021',
  ];
  public listIndicator;
  public selectedTab = 'Báo cáo tổng hợp';
  public tabList = ['Báo cáo tổng hợp', 'Báo cáo kế hoạch', 'Báo cáo cùng kỳ'];
  @ViewChild('chart') chart: ChartComponent;
  public length;
  public chartData;
  public chartType = chart.chartType;
  public legendVisible: Object = chart.legendVisible;
  public legendHidden: Object = chart.legendHidden;
  public primaryXAxis: Object = chart.primaryXDateTimeAxis;
  public primaryYAxis: Object = chart.primaryYAxis;
  public chartArea: Object = chart.chartArea;
  public width: string = Browser.isDevice ? '100%' : '100%';
  public marker: Object = chart.marker;
  public IndiMarker: Object = chart.indiMarker;
  public zoomSettings: Object = chart.zoomSettings;
  public tooltip: Object = chart.tooltip;
  public title: string = 'Biểu đồ thống kê';
  public showList = false;
  public selectedValue;
  public selectedId;
  public desc = '';
  selectedYear: any;
  selectedIndi: any;
  selectedRoleList: any;
  roleList: any;
  PositionEnabled: boolean;
  constructor(
    private chartService: ChartService,
    private reportService: ReportService,
    private indicatorService: IndicatorMeasureService,
    private statisticalService: StatisticalService,
    private roleService: RoleService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getListChart();
    this.getList();
    this.getIndicator();
    this.length = [];
    this.pageSettings = { pageSize: 6 };
  }
  getValue() {
    let result = [];
    this.list.data.forEach((item) => {
      if (this.list.loai_bao_cao == 'Báo cáo kế hoạch') {
        item.data.forEach((i) => {
          result.push(i.ma_chi_tieu);
        });
      } else if (this.list.loai_bao_cao == 'Báo cáo cùng kỳ') {
        result.push(item.du_lieu_bd[0].ma_chi_tieu);
      }
    });
    return result;
  }
  Create() {
    this.allowEdit = true;
    this.list = { tieu_de: '', data: [], loai_bao_cao: this.selectedTab };
    this.selectedValue = undefined;
  }
  Edit() {
    this.allowEdit = true;
    this.selectedValue = this.getValue();
  }
  Save() {
    this.allowEdit = false;
    this.selectedValue = undefined;
    if (this.list?._id && this.list?._id != undefined) {
      let id = this.list._id;
      delete this.list._id;
      this.update(id, this.list);
    } else {
      this.reportService.insert(this.list).subscribe(
        (result) => {
          this.getId(result[0]);
          this.getList();
          Swal.fire({
            icon: 'success',
            title: 'Thêm thành công!',
            showConfirmButton: false,
            timer: 2250,
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Thêm không thành công!',
            showConfirmButton: false,
            timer: 2250,
          });
        }
      );
    }
  }
  Cancel() {
    this.list = undefined;
  }
  Delete(id) {
    this.list = undefined;
    this.selectedValue = undefined;
    this.delete(id);
  }
  AddItem(i1, i2, type) {
    this.list.data[i1][i2]['type'] = type;
    this.list.data[i1][i2]['data'] = '';
  }
  Reload(i1, i2) {
    delete this.list.data[i1][i2].data;
    delete this.list.data[i1][i2].type;
    delete this.list.data[i1][i2]?.line;
  }
  getList() {
    this.reportService.getList().subscribe((result) => {
      this.listReport = result;
    });
  }
  getId(id) {
    this.reportService.getId(id).subscribe((result) => {
      this.list = result[0];
      this.length = [];
      this.length.push(result[0].data?.length);
      this.selectedTab = result[0].loai_bao_cao;
      this.selectedYear =
        result[0].loai_bao_cao == 'Báo cáo cùng kỳ'
          ? result[0].data[0].du_lieu_bd[0].ngay_nhap_lieu.split('-')[2] +
            '-' +
            result[0].data[0].du_lieu_bd[1].ngay_nhap_lieu.split('-')[2]
          : undefined;
    });
  }
  getIndicator() {
    this.indicatorService
      .getIndicators(null, 1, 1000, null, undefined)
      .subscribe((result) => {
        this.listIndicator = [];
        result.forEach((item) => {
          this.listIndicator.push({
            ten_chi_tieu: item.ten_chi_tieu,
            ma_chi_tieu: item.ma_chi_tieu,
          });
        });
      });
  }
  update(id, list) {
    this.reportService.update(id, list).subscribe(
      (result) => {
        this.getList();
        this.getId(id);
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
      }
    );
  }
  delete(id) {
    this.reportService.delete(id).subscribe(
      (result) => {
        this.list = undefined;
        this.getList();
        Swal.fire({
          icon: 'success',
          title: 'Xóa thành công!',
          showConfirmButton: false,
          timer: 2250,
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Xóa không thành công!',
          showConfirmButton: false,
          timer: 2250,
        });
      }
    );
  }
  getListChart() {
    this.chartService.getList().subscribe((result) => {
      this.listChart = result;
    });
  }
  getPeriodChart(id, year) {
    this.statisticalService.getPeriodChart(id, year).subscribe((result) => {
      this.list.data.push(result);
    });
  }
  getStatistical(id) {
    this.statisticalService.getStatisticalChart(id).subscribe((result) => {
      this.list.data.push(result);
    });
  }
  changeReportList(id) {
    this.allowEdit = false;
    this.getId(id);
  }
  changeYear(e) {
    this.list.data = [];
    this.selectedYear = e.value;
    if (this.selectedIndi) {
      this.selectedIndi.forEach((item) => {
        this.getPeriodChart(item, this.selectedYear);
      });
    }
  }
  changeIndicator(e) {
    this.selectedIndi = e.value;
    this.list.data = [];
    if (this.selectedYear && this.selectedTab == 'Báo cáo cùng kỳ') {
      this.selectedIndi.forEach((item) => {
        this.getPeriodChart(item, this.selectedYear);
      });
    }
    if (this.selectedTab == 'Báo cáo kế hoạch') {
      this.selectedIndi.forEach((item) => {
        this.getStatistical(item);
      });
    }
  }
  changeRole(e) {
    if (this.selectedRoleList != e.value) {
      this.selectedRoleList = e.value;
      this.updateRole(this.selectedId, e.value);
    }
  }
  isEmpty(ob) {
    for (var i in ob) {
      return false;
    }
    return true;
  }
  getCheck(): boolean {
    // console.log(this.list)
    let a: boolean = true;
    if (this.list?.data && this.list?.data.length > 0) {
      this.list.data.forEach((i) => {
        // console.log(i)
        if (
          (i.length == 1 && (this.isEmpty(i[0]) || i[0]?.data == '')) ||
          (i.length == 2 &&
            (this.isEmpty(i[0]) ||
              i[0]?.data == '' ||
              this.isEmpty(i[1]) ||
              i[1]?.data == ''))
        )
          a = false;
      });
    } else a = false;
    return a;
  }
  close() {
    this.selectedId = undefined;
    this.selectedRoleList = [];
    this.InputDialog.hide();
  }
  updateRole(id, role) {
    this.reportService.updateRole(id, role).subscribe(
      (_) => {
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
      }
    );
  }
  configRole(id) {
    this.selectedId = id;
    this.reportService.getId(id).subscribe((result) => {
      this.selectedRoleList = result[0].ma_nhom_nguoi_dung;
    });

    this.roleService.getShareReport().subscribe((result) => {
      this.roleList = result;
    });
    // this.roleService.getAll().subscribe((result) => {
    //   this.roleList = result;
    // });
  }
  onClick(item) {
    this.selectedTab = item;
    this.selectedIndi = this.selectedYear = this.selectedValue = undefined;
    this.list = undefined;
  }
  onUploadedFile(event) {
    let selectedFile = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('file', selectedFile);
    this.http
      .post<any>(
        `${environment.baseURL}/bao_cao/upload_file/?ten_bang=${
          selectedFile.name.split('.')[0]
        }`,
        formData,
        {
          reportProgress: true,
          observe: 'events',
        }
      )
      .subscribe(
        (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Tải file thành công!',
            showConfirmButton: false,
            timer: 2250,
          });
        },
        (_) => {
          Swal.fire({
            icon: 'error',
            title: 'Tải file không thành công!',
            showConfirmButton: false,
            timer: 2250,
          });
        }
      );
  }
  downloadFile() {
    this.statisticalService.downloadReport([this.list]).subscribe((res) => {
      window.location.href = res.toString();
    });
  }
  change(e, i1, i2) {
    this.chartService.getId(e.value).subscribe((result) => {
      this.list.data[i1][i2]['data'] = result[0];
      this.list.data[i1][i2]['line'] = { text: 'Biểu đồ đường', value: 'Line' };
      this.title = 'Biểu đồ ' + result[0]?.ten_bieu_do;
      this.desc = result[0]?.mo_ta;
      this.length = [];
      this.length.push(result[0].data?.length);
    });
  }
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
  changeChartType(e, i1, i2) {
    this.list.data[i1][i2]['line'] = e.itemData;
    if (this.list.data[i1][i2]['line'].value == 'Line') {
      this.marker = {
        visible: false,
        height: 6,
        width: 6,
      };
    }
    if (this.list.data[i1][i2]['line'].value == 'Column') {
      this.marker = {
        visible: false,
        height: 10,
        width: 10,
      };
    }
    if (this.list.data[i1][i2]['line'].value == 'StackingArea100') {
      this.marker = {
        visible: false,
        height: 5,
        width: 5,
      };
    }
  }

  formatDate(chartData) {
    
      for (var _date_idx in chartData) {
        var _date = chartData[_date_idx]['ngay_nhap_lieu'];
        var parts;
        var dt;
        // console.log(_date)
        if (typeof _date === 'string') {
          if ((_date.includes('T'))) {
            parts = _date.split('T')[0].split('-');
            dt = new Date(
              parseInt(parts[0], 10),
              parseInt(parts[1], 10) - 1,
              parseInt(parts[2], 10)
            );
            chartData[_date_idx]['ngay_nhap_lieu'] = dt;
          } else {
            parts = _date.split('-');
            if (parts.length > 2) {
              dt = new Date(
                parseInt(parts[2], 10),
                parseInt(parts[1], 10) - 1,
                parseInt(parts[0], 10)
              );
              chartData[_date_idx]['ngay_nhap_lieu'] = dt;
            }
          }  
        }
      }
    
    return chartData
  }

  getXAxisType(chartdata) {
    // console.log('data', chartdata)
    if ('param' in chartdata && 'tach_nam' in chartdata['param'] && chartdata['param']['tach_nam'] == true) {
      return chart.primaryXMonthTimeAxis  
    }
    return chart.primaryXDateTimeAxis
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
  public onFiltering: EmitType<FilteringEventArgs> = (
    e: FilteringEventArgs
  ) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query =
      e.text !== '' ? query.where('name', 'startswith', e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.listReport, query);
  };
}
