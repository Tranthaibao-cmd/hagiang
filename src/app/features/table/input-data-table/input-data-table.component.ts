import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { IndicatorService } from '@features/service/indicator-service/indicator.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import {
  DataStateChangeEventArgs,
  resizeStart,
} from '@syncfusion/ej2-angular-grids';
import { environment } from 'src/environments/environment';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import Swal from 'sweetalert2';
import { ShareFunctionService } from '@features/service/share-function-service/share-function.service';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
@Component({
  selector: 'app-input-data-table',
  templateUrl: './input-data-table.component.html',
  styleUrls: ['./input-data-table.component.scss'],
})
export class InputDataTableComponent implements OnInit, OnChanges {
  subscription: Subscription;
  @Input('currentPeriod') currentPeriod;
  @Input('currentYear') currentYear;
  @Input('currentBranch') currentBranch;
  // @Input('currentBranch') currentBranch;
  @ViewChild('treegrid') treegrid: TreeGridComponent;
  public user;
  public sobo= false;
  public href;
  public selectedFile;
  public indicatorList: Observable<DataStateChangeEventArgs>;
  public editSettings;
  public toolbar;
  public pageSettings;
  public width = 250;
  public position;
  public numericParams = [{ params: { decimals: 2, step: 1, min: 0 } }];
  public inputList = [];
  public timeOut;
  public customPatterns = { '0': { pattern: new RegExp('\[0-9.\]') } };
  constructor(
    private indicatorService: IndicatorService,
    private http: HttpClient,
    private shareService: ShareFunctionService,
    private authService: AuthenticationService
  ) {
    this.user = this.authService.User;
    if(this.user.rolename=='Cục thống kê')
    {this.sobo= true;}
  }
  ngOnChanges(): void {
    this.get();
    this.inputList = [];
  }

  ngOnInit(): void {
    this.indicatorService.refresh$.subscribe((result) => {
      this.get();
    });
    this.get();
    this.toolbar = [
      {
        text: 'Lưu',
        // tooltipText: 'Lưu',
        prefixIcon: 'e-save_2',
        id: 'updateinput',
      },
      'Search',
    ];
    var screenWidth = window.innerWidth;
    this.pageSettings = { pageSize: screenWidth > 1366 ? 15 : 10 };
    this.position = { X: (screenWidth - this.width) / 2, Y: 100 };
   
  }
  clickHandler(args: ClickEventArgs): void {
    if (args.item.id === 'updateinput') {
      this.inputList.forEach((e) => {
        this.update(e);
      });
      this.inputList = [];
    }
  }
  get() {
    this.indicatorService
      .getNhapLieu({
        ky_nhap_lieu: this.currentPeriod,
        nam: this.currentYear,
        nhom_nganh: this.currentBranch,
      })
      .subscribe((result) => {
        this.indicatorList = result;
        
      });
  }
  checksobo(data){
    
  }
  onUploadedFile(event, id) {
    this.selectedFile = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    clearTimeout(this.timeOut);
    this.http
      .post<any>(
        `${environment.baseURL}/nhap_lieu_dau_vao/${id}/upload-file`,
        formData,
        {
          reportProgress: true,
          observe: 'events',
        }
      )
      .subscribe((data) => {
        if (data['status'] == '200') {
          Swal.fire({
            icon: 'success',
            title: 'Cập nhật thành công!',
            showConfirmButton: false,
            timer: 2250,
          });
          this.get();
        }
      });
  }
  update(data) {
    if (typeof data.gia_tri == 'string')
      data.gia_tri = this.shareService.commaToDot(data.gia_tri);
    if (typeof data.uoc_tinh == 'string')
      data.uoc_tinh = this.shareService.commaToDot(data.uoc_tinh);
    if (typeof data.gia_tri_so_bo == 'string')
      data.gia_tri_so_bo = this.shareService.commaToDot(data.gia_tri_so_bo);
    console.log(data);
    this.indicatorService.updateNhapLieu(data).subscribe(
      (result) => {
        Swal.fire({
          icon: 'success',
          title: 'Lưu thành công!',
          showConfirmButton: false,
          timer: 2250,
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Lưu thất bại!',
          showConfirmButton: false,
          timer: 2250,
        });
        this.get();
      }
    );
    
  }
  changeText(e) {
    console.log(e);
  }
  changeInput(e, data, type) {
    let index = this.inputList.findIndex(
      (i) => i.ma_chi_tieu == data.ma_chi_tieu
    );
    if (index >= 0) {
      if (type === 'value') this.inputList[index].gia_tri = e.target.value;
      else if (type === 'desc') this.inputList[index].mo_ta = e.target.value;
      else if (type === 'predict')
        this.inputList[index].uoc_tinh = +e.target.value;
    } else {
      this.inputList.push({
        ma_chi_tieu: data.ma_chi_tieu,
        ten_chi_tieu: data.ten_chi_tieu,
        gia_tri: type === 'value' ? e.target.value : data.gia_tri,
        uoc_tinh: type === 'predict' ? e.target.value : data.uoc_tinh,
        mo_ta: type === 'desc' ? e.target.value : data.mo_ta,
        ky_nhap_lieu: this.currentPeriod,
        nam: this.currentYear,
        gia_tri_so_bo: type=== 'sobo_var' ? e.target.value : data.gia_tri_so_bo,


      });
    }
  }
  getValue(id, value, target) {
    let data_value =
      this.inputList[this.inputList.findIndex((i) => i.id == id)]?.[target];
    if (['gia_tri', 'uoc_tinh','gia_tri_so_bo'].includes(target))
      return data_value ? data_value : this.shareService.dotToComma(value);
    else return data_value ? data_value : value;
  }
  public onLoad() {
    this.treegrid.element.addEventListener(
      'keydown',
      this.debounce((e) => {
        if (e.target.getAttribute('id')) {
          if (e.target.getAttribute('id').indexOf('_searchbar') !== -1) {
            this.treegrid.search((e.target as HTMLInputElement).value);
          }
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
    if ((this.treegrid.dataSource as any)?.length === 0) {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'none';
    } else {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'block';
    }
  }
}
