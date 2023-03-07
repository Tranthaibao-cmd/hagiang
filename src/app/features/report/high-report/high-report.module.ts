import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighReportComponent } from './high-report.component';

import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { AlertModule } from '@shared/alert/alert.module';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

import {
  PageService,
  SortService,
  FilterService,
  EditService,
} from '@syncfusion/ej2-angular-treegrid';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HighReportComponent],
  imports: [
    CommonModule,
    TreeGridModule,
    DropDownListModule,
    AlertModule,
    NumericTextBoxModule,
    DialogModule,
    FormsModule
  ],
  providers: [PageService, SortService, FilterService, EditService],
  exports: [HighReportComponent]
})
export class HighReportModule {}
