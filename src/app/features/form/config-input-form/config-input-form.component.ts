import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IndicatorService } from '@features/service/indicator-service/indicator.service';
import { RoleService } from '@features/service/role-service/role.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-config-input-form',
  templateUrl: './config-input-form.component.html',
  styleUrls: ['./config-input-form.component.scss'],
})
export class ConfigInputFormComponent implements OnInit {
  @Output() clickCancel = new EventEmitter();
  @Output() clickSubmit = new EventEmitter();
  public currentDate = new Date();
  public currentDateString;
  public roleList;
  public inputForm: FormGroup;
  public indicatorList;
  public periodList = ['Quý', 'Năm'];
  public unitList = [
    'Người',
    'Tỷ đồng',
    'Hộ',
    'Tấn',
    'Đơn vị',
    'Ha',
    'Con',
    'Lượt',
    'Giường',
    'Thôn',
    'Tuổi',
    'Trường học',
  ];
  public error = '';

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private indicatorService: IndicatorService
  ) {
    this.currentDateString = formatDate(
      this.currentDate,
      'dd-MM-yyyy',
      'en-US'
    );
  }

  ngOnInit(): void {
    this.createForm();
    // this.getRole();
  }

  createForm(): void {
    this.inputForm = this.fb.group({
      id_indi: ['', [Validators.required]],
      name: ['', [Validators.required]],
      roleid: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      period: ['', [Validators.required]],
    });
  }
  // getRole() {
  //   this.roleService.getRole('', 100, 1).subscribe((data) => {
  //     this.roleList = data.data[0].data;
  //   });
  // }
  get formIdIndiCtrl(): FormControl {
    return this.inputForm.get('id_indi') as FormControl;
  }
  get formNameCtrl(): FormControl {
    return this.inputForm.get('name') as FormControl;
  }
  get formRoleIdCtrl(): FormControl {
    return this.inputForm.get('roleid') as FormControl;
  }
  get formUnitCtrl(): FormControl {
    return this.inputForm.get('unit') as FormControl;
  }
  get formPeriodCtrl(): FormControl {
    return this.inputForm.get('period') as FormControl;
  }
  submit() {
    var index = this.roleList.findIndex(
      (x) => x.id == this.inputForm.value.roleid
    );
    var name = this.roleList[index].name_user_group;
    this.indicatorService
      .insert({
        id_indi: this.inputForm.value.id_indi,
        name: this.inputForm.value.name,
        date: this.currentDateString,
        roleid: this.inputForm.value.roleid,
        rolename: name,
        period: this.inputForm.value.period,
        unit: this.inputForm.value.unit,
        status: 1,
      })
      .subscribe((data) => {
        if (data.code == '200') {
          Swal.fire({
            icon: 'success',
            title: 'Thêm thành công!!',
            showConfirmButton: false,
            timer: 1500
          })
          this.inputForm.patchValue({
            id_indi: '',
            name: '',
            roleid: '',
            unit: '',
            period: '',
          });
          this.clickSubmit.emit(false);
        } else if (data.code == '404') {
          this.error = this.inputForm.value.id_indi + ' đã tồn tại!';
          this.clickSubmit.emit(true);
        }
      });
  }
  onCancel() {
    this.clickCancel.emit(false);
  }
}
