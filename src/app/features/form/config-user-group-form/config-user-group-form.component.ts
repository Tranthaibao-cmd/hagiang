import { DatePipe, formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RoleService } from '@features/service/role-service/role.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-config-user-group-form',
  templateUrl: './config-user-group-form.component.html',
  styleUrls: ['./config-user-group-form.component.scss'],
  providers: [DatePipe],
})
export class ConfigUserGroupFormComponent implements OnInit {
  @Output() clickCancel = new EventEmitter();
  @Output() clickSubmit = new EventEmitter();
  public currentDate = new Date();
  public currentDateString;
  public userGroupForm: FormGroup;
  public error = '';
  public hideSvg = '../../../assets/icon/hide.svg';
  public showSvg = '../../../assets/icon/view.svg';

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService
  ) {
    this.currentDateString = formatDate(
      this.currentDate,
      'yyyy-MM-dd',
      'en-US'
    );
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(): void {
    this.userGroupForm = this.fb.group({
      name_user_group: ['', [Validators.required]]
    });
  }
  get formNameUserGroupCtrl(): FormControl {
    return this.userGroupForm.get('name_user_group') as FormControl;
  }
  submit() {
    this.roleService
      .insert({
        name_user_group: this.userGroupForm.value.name_user_group,
        date_created: this.currentDateString,
        status: true,
      })
      .subscribe((data) => {
        if (data.code == '201') {
          Swal.fire({
            icon: 'success',
            title: 'Thêm mới thành công!!',
            showConfirmButton: false,
            timer: 1500
          })
          this.userGroupForm.patchValue({ name_user_group: '' });
          this.clickSubmit.emit(false);
        }
        else if(data.code == '409'){
          this.error = this.userGroupForm.value.name_user_group + ' đã tồn tại!';
          this.clickSubmit.emit(true);
        }
      });
  }
  onCancel() {
    this.clickCancel.emit(false);
  }
}
