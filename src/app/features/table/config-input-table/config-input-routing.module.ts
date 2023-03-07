import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigInputTableComponent } from './config-input-table.component';

const configInputTableRoutes: Routes = [
  { path: '', component: ConfigInputTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(configInputTableRoutes)],
  exports: [RouterModule],
})
export class ConfigInputTableRoutingModule {}
