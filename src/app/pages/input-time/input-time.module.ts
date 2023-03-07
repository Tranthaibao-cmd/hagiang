import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertModule } from '@shared/alert/alert.module';
import {
  CheckBoxSelectionService,
  DropDownListModule,
  MultiSelectModule,
} from '@syncfusion/ej2-angular-dropdowns';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import {
  PageService,
  SortService,
  SearchService,
  ToolbarService,
  EditService,
  FilterService,
} from '@syncfusion/ej2-angular-grids';
import { InputTimeRoutingModule } from './input-time-routing.module';
import { InputTimeComponent } from './input-time.component';
@NgModule({
  declarations: [InputTimeComponent],
  imports: [
    CommonModule,
    InputTimeRoutingModule,
    AlertModule,
    DropDownListModule,
    MultiSelectModule,
    GridModule,
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    ToolbarService,
    EditService,
    SearchService
  ],
  exports: [],
})
export class InputTimeModule {}
