import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SynthesisReportComponent } from './synthesis-report.component';

const reportRoutes: Routes = [
  {
    path: '',
    component: SynthesisReportComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(reportRoutes)],
  exports: [RouterModule],
})
export class SynthesisReportRoutingModule {}
