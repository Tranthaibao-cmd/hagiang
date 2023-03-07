import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import {
  PageService,
  SortService,
  FilterService,
  ToolbarService,
  EditService,
  SelectionService,
} from '@syncfusion/ej2-angular-treegrid';
import { AlertModule } from '@shared/alert/alert.module';

import { PredictTableComponent } from './predict-table.component';

@NgModule({
  declarations: [PredictTableComponent],
  imports: [CommonModule, TreeGridModule, AlertModule],
  providers: [
    PageService,
    SortService,
    FilterService,
    ToolbarService,
    EditService,
    SelectionService,
  ],
  exports: [PredictTableComponent],
})
export class PredictTableModule {}
