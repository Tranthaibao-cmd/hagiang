import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';

@Component({
  selector: 'app-periodic-report',
  templateUrl: './periodic-report.component.html',
  styleUrls: ['./periodic-report.component.scss'],
})
export class PeriodicReportComponent implements OnInit {
  user;
  constructor(private authService: AuthenticationService) {
    this.authService.getUserObservable().subscribe((res) => {
      this.user = res;
    });
  }

  ngOnInit(): void {}
}
