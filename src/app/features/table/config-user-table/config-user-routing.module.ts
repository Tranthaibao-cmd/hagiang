import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigUserTableComponent } from './config-user-table.component';

const configUserTableRoutes: Routes = [
  { path: '', component: ConfigUserTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(configUserTableRoutes)],
  exports: [RouterModule],
})
export class ConfigUserTableRoutingModule {}
