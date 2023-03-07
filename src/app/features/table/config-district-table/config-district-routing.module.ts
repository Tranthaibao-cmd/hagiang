import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigDistrictTableComponent } from './config-district-table.component';

const configDistrictTableRoutes: Routes = [
  { path: '', component: ConfigDistrictTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(configDistrictTableRoutes)],
  exports: [RouterModule],
})
export class ConfigDistrictTableRoutingModule {}
