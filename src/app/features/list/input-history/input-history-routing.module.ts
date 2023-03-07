import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InputHistoryComponent } from "./input-history.component";

const historyRoutes: Routes = [{
    path: '',
    component: InputHistoryComponent
}]

@NgModule({
    imports: [RouterModule.forChild(historyRoutes)],
    exports: [RouterModule]
})
export class InputHistoryRoutingModule{}