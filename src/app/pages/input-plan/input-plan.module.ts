import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputPlanTableModule } from "@features/table/input-plan-table/input-plan-table.module";
import { DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import { InputPlanRoutingModule } from "./input-plan-routing.module";
import { InputPlanComponent } from "./input-plan.component";

@NgModule({
    declarations: [InputPlanComponent],
    imports: [CommonModule, InputPlanRoutingModule, InputPlanTableModule, DropDownListModule],
    exports: [],
})
export class InputPlanModule{}