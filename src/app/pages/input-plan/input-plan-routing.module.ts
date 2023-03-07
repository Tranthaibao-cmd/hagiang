import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InputPlanComponent } from "./input-plan.component";

const inputPlanRoutes: Routes = [{
    path: '',
    component: InputPlanComponent
}]
@NgModule({
    imports: [RouterModule.forChild(inputPlanRoutes)],
    exports: [RouterModule]
})
export class InputPlanRoutingModule{}