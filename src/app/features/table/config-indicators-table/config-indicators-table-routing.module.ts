import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfigIndicatorsTableComponent } from "./config-indicators-table.component";

const ConfigIndicatorsTableRoute: Routes = [{path: '', component: ConfigIndicatorsTableComponent}]
@NgModule({
    imports: [RouterModule.forChild(ConfigIndicatorsTableRoute)],
    exports: [RouterModule]
})
export class ConfigIndicatorsTableRoutingModule{}