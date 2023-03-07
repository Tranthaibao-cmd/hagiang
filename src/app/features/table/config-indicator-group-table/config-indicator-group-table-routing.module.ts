import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigIndicatorGroupTableComponent } from './config-indicator-group-table.component';

const ConfigIndicatorGroupTableRoute: Routes = [
  { path: '', component: ConfigIndicatorGroupTableComponent },
];
@NgModule({
    imports: [RouterModule.forChild(ConfigIndicatorGroupTableRoute)],
    exports: [RouterModule]
})
export class ConfigIndicatorGroupTableRoutingModule{}
