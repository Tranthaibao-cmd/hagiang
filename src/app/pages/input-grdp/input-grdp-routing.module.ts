import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InputGrdpComponent } from "./input-grdp.component";

const inputGrdpRoutes: Routes = [{
    path: '',
    component: InputGrdpComponent
}]
@NgModule({
    imports: [RouterModule.forChild(inputGrdpRoutes)],
    exports: [RouterModule]
})
export class InputGrdpRoutingModule{}