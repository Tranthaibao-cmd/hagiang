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

import { StatisticalTableComponent } from './statistical-table.component';

@NgModule({
  declarations: [StatisticalTableComponent],
  imports: [CommonModule, TreeGridModule],
  providers: [
    PageService,
    SortService,
    FilterService,
    ToolbarService,
    EditService,
    SelectionService,
  ],
  exports: [StatisticalTableComponent],
})
export class StatisticalTableModule {}
