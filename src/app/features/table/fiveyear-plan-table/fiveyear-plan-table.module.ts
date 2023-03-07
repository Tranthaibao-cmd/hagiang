import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { AlertModule } from '@shared/alert/alert.module';


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
import { FiveyearPlanTableComponent } from './fiveyear-plan-table.component';
@NgModule({
  declarations: [FiveyearPlanTableComponent],
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
  exports: [FiveyearPlanTableComponent],
})
export class FiveyearPlanTableModule {}
