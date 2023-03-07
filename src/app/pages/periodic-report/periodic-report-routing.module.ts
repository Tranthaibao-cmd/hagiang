import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodicReportComponent } from './periodic-report.component';

const routes: Routes = [
  {
    path: '',
    component: PeriodicReportComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeriodicReportRoutingModule {}
