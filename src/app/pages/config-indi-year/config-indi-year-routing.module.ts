import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfigIndiYearComponent } from "./config-indi-year.component";

const routes: Routes = [
    {path: '', component: ConfigIndiYearComponent},
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfigIndiYearRoutingModule{}