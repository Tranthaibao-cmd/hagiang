import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { InputHistoryRoutingModule } from "./input-history-routing.module";
import { TooltipModule } from '@syncfusion/ej2-angular-popups';

import { InputHistoryComponent } from "./input-history.component";

@NgModule({
    declarations: [InputHistoryComponent],
    imports: [CommonModule, InputHistoryRoutingModule, TooltipModule],
    providers: [],
})
export class InputHistoryModule{}