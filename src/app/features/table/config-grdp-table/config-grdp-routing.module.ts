import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigGrdpTableComponent } from './config-grdp-table.component';

const configGRDPTableRoutes: Routes = [
  { path: '', component: ConfigGrdpTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(configGRDPTableRoutes)],
  exports: [RouterModule],
})
export class ConfigGRDPTableRoutingModule {}
