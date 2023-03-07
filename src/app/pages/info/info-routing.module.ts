import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InfoComponent } from "./info.component";

const infoRoute: Routes = [
    {path: '', component: InfoComponent},
]
@NgModule({
    imports: [RouterModule.forChild(infoRoute)],
    exports: [RouterModule]
})
export class InfoRoutingModule{}