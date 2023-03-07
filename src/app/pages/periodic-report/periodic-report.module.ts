import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodicReportComponent } from './periodic-report.component';
import { ReportModule } from '@features/report/report/report.module';
import { HighReportModule } from '@features/report/high-report/high-report.module';
import { PeriodicReportRoutingModule } from './periodic-report-routing.module';
@NgModule({
  declarations: [PeriodicReportComponent],
  imports: [CommonModule, ReportModule, HighReportModule, PeriodicReportRoutingModule],
  providers: [],
})
export class PeriodicReportModule {}
