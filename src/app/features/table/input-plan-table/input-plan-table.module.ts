import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { AlertModule } from '@shared/alert/alert.module';

import { InputPlanTableComponent } from './input-plan-table.component';

import {
  PageService,
  SortService,
  FilterService,
  ToolbarService,
  EditService,
} from '@syncfusion/ej2-angular-treegrid';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [InputPlanTableComponent],
  imports: [
    CommonModule,
    TreeGridModule,
    DialogModule,
    AlertModule,
    NumericTextBoxModule,
    DropDownListModule,
    FormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    ToolbarService,
    EditService,
  ],
  exports: [InputPlanTableComponent],
})
export class InputPlanTableModule {}
