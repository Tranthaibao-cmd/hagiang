import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvinceReportComponent } from './province-report.component';

const routes: Routes = [
  {
    path: '',
    component: ProvinceReportComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvinceReportRoutingModule {}
