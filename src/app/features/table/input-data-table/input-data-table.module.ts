import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDataTableComponent } from './input-data-table.component';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import {
  PageService,
  SortService,
  FilterService,
  ToolbarService,
  EditService,
} from '@syncfusion/ej2-angular-treegrid';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { AlertModule } from '@shared/alert/alert.module';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask'
// const maskConfig: Partial<IConfig> = {
//   validation: false,
// };
@NgModule({
  declarations: [InputDataTableComponent],
  imports: [
    CommonModule,
    TreeGridModule,
    DialogModule,
    AlertModule,
    NumericTextBoxModule,
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
  exports: [InputDataTableComponent],
})
export class InputDataTableModule {}
