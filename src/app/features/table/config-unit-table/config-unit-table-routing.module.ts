import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigUnitTableComponent } from './config-unit-table.component';

const configUnitTableRoutes: Routes = [
  { path: '', component: ConfigUnitTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(configUnitTableRoutes)],
  exports: [RouterModule],
})
export class ConfigUnitTableRoutingModule {}
