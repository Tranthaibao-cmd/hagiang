import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit {
  public user;

  constructor(
    private router: Router,
    private AuthService: AuthenticationService
  ) {
    // this.user = this.AuthService.User;
    // if (this.user.rolename != 'Quản trị viên') {
    //   this.router.navigate(['/nhap-lieu']);
    // }
  }

  ngOnInit(): void {
    if (this.router.url == '/cau-hinh') {
      this.router.navigate(['/cau-hinh/dau-vao']);
    }
  }
}
