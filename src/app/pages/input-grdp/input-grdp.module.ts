import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputGrdpTableModule } from "@features/table/input-grdp-table/input-grdp-table.module";
import { InputGrdpRoutingModule } from "./input-grdp-routing.module";
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { InputGrdpComponent } from "./input-grdp.component";

@NgModule({
    declarations: [InputGrdpComponent],
    imports: [CommonModule, InputGrdpRoutingModule, InputGrdpTableModule, DropDownListModule, TooltipModule],
    exports: [],
})
export class InputGrdpModule{}