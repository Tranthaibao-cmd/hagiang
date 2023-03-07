import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  returnUrl: any;
  typePass = true;
  loginStatus = '';
  loginForm: FormGroup;
  mess;
  public hideIcon = 'fas fa-eye';
  public showIcon = 'fas fa-eye-slash';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private AuthService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  ngOnInit(): void {}

  submit(): void {
    let username = this.f.username.value;
    let password = this.f.password.value;
    this.AuthService.login(username, password)
      .pipe(first())
      .subscribe(
        (next) => {
          if(next['quyen_tai_nguyen'].length == 0){
            this.mess = 'Bạn chưa được cấp quyền đăng nhập hệ thống';
          }
          this.router.navigateByUrl(this.returnUrl);
        },
        (error) => {
          this.mess = 'Tên đăng nhập hoặc mật khẩu không đúng';
        }
      );
  }
  get f() {
    return this.loginForm.controls;
  }
  get loginUsernameCtrl(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }
  get loginPasswordCtrl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
