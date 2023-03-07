import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { UserService } from '@features/service/user-service/user.service';
import { uploadAvatarURL } from '@shared/share';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  public infoForm: FormGroup;
  public selectedFile;
  public uploadedAvatar = '';
  public user;
  public position;
  public width = 250;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthenticationService,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    var screenWidth = window.innerWidth;
    this.position = { X: (screenWidth - this.width) / 2, Y: 100 };
    this.userService.refresh$.subscribe(() => {
      this.user = this.authService.User;
    });
    this.user = this.authService.User;
    this.createForm();
  }

  createForm(): void {
    this.infoForm = this.fb.group({
      ten_day_du: [this.user.ten_day_du || '', [Validators.required]],
      so_dien_thoai: [this.user.so_dien_thoai || ''],
      email: [this.user.email || '', [Validators.required]],
    });
  }
  get formNameCtrl(): FormControl {
    return this.infoForm.get('ten_day_du') as FormControl;
  }
  get formTelePhoneCtrl(): FormControl {
    return this.infoForm.get('so_dien_thoai') as FormControl;
  }
  get formEmailCtrl(): FormControl {
    return this.infoForm.get('email') as FormControl;
  }
  get formAvatarCtrl(): FormControl {
    return this.infoForm.get('anh_dai_dien') as FormControl;
  }
  onUploadedFile(event) {
    this.selectedFile = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('uploaded_file', this.selectedFile);
    this.http.post<any>(uploadAvatarURL, formData).subscribe(
      (result) => {
        this.uploadedAvatar = result
      },
      (error) => {
        this.uploadedAvatar = '';
        Swal.fire({
          icon: 'error',
          title: 'Tải ảnh thất bại!',
          showConfirmButton: false,
          timer: 2250,
        });
      }
    );
  }
  return() {
    this.location.back();
  }
  submit() {
    let user = {
      ten_day_du: this.infoForm.value.ten_day_du,
      so_dien_thoai: this.infoForm.value.so_dien_thoai,
      email: this.infoForm.value.email,
      anh_dai_dien: this.uploadedAvatar,
    };
    this.userService.updateInfo(user).subscribe(
      (result) => {
        if (result.code == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Cập nhật ảnh thành công!',
            showConfirmButton: false,
            timer: 2250,
          });
          this.user.anh_dai_dien =
            this.uploadedAvatar || this.user.anh_dai_dien;
          this.user.ten_day_du = user.ten_day_du;
          this.user.so_dien_thoai = user.so_dien_thoai;
          this.user.email = user.email;
          this.authService.User = this.user;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Cập nhật ảnh không thành công!',
            showConfirmButton: false,
            timer: 2250,
          });
        }
      },
      (error) => {}
    );
  }
}
