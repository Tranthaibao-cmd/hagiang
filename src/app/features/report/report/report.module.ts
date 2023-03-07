import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import {
  PageService,
  SortService,
  FilterService,
  EditService,
} from '@syncfusion/ej2-angular-treegrid';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';
import { AlertModule } from '@shared/alert/alert.module';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { NgxMaskModule } from 'ngx-mask';
@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    DropDownListModule,
    FormsModule,
    AlertModule,
    DialogModule,
    TreeGridModule,
    FormsModule,
    NumericTextBoxModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [PageService, SortService, FilterService, EditService],
  exports: [ReportComponent],
})
export class ReportModule {}
