import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangePassComponent } from "./change-pass.component";

const changePassRoute: Routes = [{
    path: '',
    component: ChangePassComponent
}]
@NgModule({
    imports: [RouterModule.forChild(changePassRoute)],
    exports: [RouterModule]
})
export class ChangePassRoutingModule{}