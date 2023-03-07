import { formatDate } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RoleService } from '@features/service/role-service/role.service';
import { UserService } from '@features/service/user-service/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Output() clickCancel = new EventEmitter();
  public userForm: FormGroup;
  public typePass = true;
  public typeConfirm = true;
  public roleList;
  public currentDate = new Date();
  public currentDateString;
  public hideSvg = '../../../assets/icon/hide.svg';
  public showSvg = '../../../assets/icon/view.svg';
  initFormValue: any = {
    user_name: '',
    password: '',
    roleid: '',
    full_name: '',
    phone_number: '',
    email: '',
    avatar: '',
  };

  onCancel() {
    this.clickCancel.emit(false);
  }
  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private userService: UserService
  ) {
    this.currentDateString = formatDate(
      this.currentDate,
      'dd-MM-yyyy',
      'en-US'
    );
  }

  ngOnInit(): void {
    // this.getRole();
    this.createForm();
  }
  createForm(): void {
    this.userForm = this.fb.group({
      user_name: [
        this.initFormValue.user_name,
        [Validators.required, Validators.minLength(4)],
      ],
      password: [
        this.initFormValue.password,
        [Validators.required, Validators.minLength(4)],
      ],
      // confirmPassword: [this.initFormValue.confirmPassword, [Validators.required, Validators.minLength(4)]],
      roleid: [this.initFormValue.roleid, [Validators.required]],
      full_name: [
        this.initFormValue.full_name,
        [Validators.required, Validators.minLength(4)],
      ],
      phone_number: [this.initFormValue.phone_number, [Validators.required]],
      email: [this.initFormValue.email, [Validators.required]],
      avatar: [this.initFormValue.avatar],
    });
  }
  get formUserNameCtrl(): FormControl {
    return this.userForm.get('user_name') as FormControl;
  }
  get formPasswordCtrl(): FormControl {
    return this.userForm.get('password') as FormControl;
  }
  get formRoleIdCtrl(): FormControl {
    return this.userForm.get('roleid') as FormControl;
  }
  get formFullNameCtrl(): FormControl {
    return this.userForm.get('full_name') as FormControl;
  }
  get formPhoneNumberCtrl(): FormControl {
    return this.userForm.get('phone_number') as FormControl;
  }
  get formEmailCtrl(): FormControl {
    return this.userForm.get('email') as FormControl;
  }
  get formAvatarCtrl(): FormControl {
    return this.userForm.get('avatar') as FormControl;
  }
  // getRole() {
  //   this.roleService.getRole('', 100, 1).subscribe((data) => {
  //     this.roleList = data.data[0].data;
  //   });
  // }
  submit() {
    var user = {
      user_name: this.userForm.value.user_name,
      password: this.userForm.value.password,
      roleid: this.userForm.value.roleid,
      full_name: this.userForm.value.full_name,
      phone_number: this.userForm.value.phone_number,
      email: this.userForm.value.email,
      avatar: this.userForm.value.avatar,
      date_created: this.currentDateString,
      status: true,
    };
    this.userService.insert(user).subscribe((result) => {
      if (result.code == '200') {
        Swal.fire({
          icon: 'success',
          title: 'Thêm mới thành công!!',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Thêm mới thất bại!!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }
}
