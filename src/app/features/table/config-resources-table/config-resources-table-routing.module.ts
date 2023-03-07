import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigResourcesTableComponent } from './config-resources-table.component';

const configResourcesTableRoutes: Routes = [
  { path: '', component: ConfigResourcesTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(configResourcesTableRoutes)],
  exports: [RouterModule],
})
export class ConfigResourcesTableRoutingModule {}
