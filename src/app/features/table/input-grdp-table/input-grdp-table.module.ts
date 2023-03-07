import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

import { InputGrdpTableComponent } from './input-grdp-table.component';

import {
  PageService,
  SortService,
  FilterService,
  ToolbarService,
  EditService,
} from '@syncfusion/ej2-angular-treegrid';
import { AlertModule } from '@shared/alert/alert.module';

@NgModule({
  declarations: [InputGrdpTableComponent],
  imports: [CommonModule, TreeGridModule, DialogModule, AlertModule],
  providers: [
    PageService,
    SortService,
    FilterService,
    ToolbarService,
    EditService,
  ],
  exports: [InputGrdpTableComponent],
})
export class InputGrdpTableModule {}
