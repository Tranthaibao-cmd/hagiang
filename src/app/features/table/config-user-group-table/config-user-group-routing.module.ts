import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigUserGroupTableComponent } from './config-user-group-table.component';

const configUserGroupTableRoutes: Routes = [
  { path: '', component: ConfigUserGroupTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(configUserGroupTableRoutes)],
  exports: [RouterModule],
})
export class ConfigUserGroupTableRoutingModule {}
