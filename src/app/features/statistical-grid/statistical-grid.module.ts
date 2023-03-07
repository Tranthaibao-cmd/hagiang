import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import {
  PageService,
  SortService,
  FilterService,
  GroupService,
  SearchService,
  ToolbarService,
  EditService,
  ForeignKeyService,
} from '@syncfusion/ej2-angular-grids';
import { StatisticalGridComponent } from './statistical-grid.component';
@NgModule({
  declarations: [StatisticalGridComponent],
  imports: [
    CommonModule,
    DropDownListModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    GridModule,
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    GroupService,
    SearchService,
    ToolbarService,
    EditService,
    ForeignKeyService,
  ],
  exports: [StatisticalGridComponent],
})
export class StatisticalGridModule {}
