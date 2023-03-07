import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { UserService } from '@features/service/user-service/user.service';
import { passwordValidator } from '@shared/password.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent implements OnInit {
  public passForm: FormGroup;
  public error = '';
  public position;
  public old_pass_icon = 'fas fa-eye-slash';
  public new_pass_icon = 'fas fa-eye-slash';
  public hide_eye = 'fas fa-eye';
  public show_eye = 'fas fa-eye-slash';
  public width = 250;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthenticationService,
    
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.passForm = this.fb.group({
      mat_khau_cu: ['', [Validators.required]],
      mat_khau_moi: ['', [Validators.required, passwordValidator]],
    });
  }
  get formOldPassCtrl(): FormControl {
    return this.passForm.get('mat_khau_cu') as FormControl;
  }
  get formNewPassCtrl(): FormControl {
    return this.passForm.get('mat_khau_moi') as FormControl;
  }
  showPass(pass) {
    if (pass.type == 'password') {
      pass.type = 'text';
      if (pass.id == 'mat_khau_cu') {
        this.old_pass_icon = this.hide_eye;
      } else {
        this.new_pass_icon = this.hide_eye;
      }
    } else {
      pass.type = 'password';
      if (pass.id == 'mat_khau_cu') {
        this.old_pass_icon = this.show_eye;
      } else {
        this.new_pass_icon = this.show_eye;
      }
    }
  }
  submit() {
    let value = this.passForm.value
    if (value.mat_khau_cu == value.mat_khau_moi && value.mat_khau_moi != '' ) {
      this.error = 'Mật khẩu mới không được trùng mật khẩu cũ';
    } else {
      this.userService
        .changePassword(value)
        .subscribe((result) => {
          if (result.code == 200) {
            Swal.fire({
              icon: 'success',
              title: 'Đổi mật khẩu thành công!',
              showConfirmButton: false,
              timer: 2250,
            });
            this.authService.logout();
          } else if (result.code == 409) {
            Swal.fire({
              icon: 'error',
              title: 'Mật khẩu cũ không đúng!',
              showConfirmButton: false,
              timer: 2250,
            });
          }
        });
    }
  }
}
