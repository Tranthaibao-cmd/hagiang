import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertModule } from '@shared/alert/alert.module';
import { ConfigIndiYearRoutingModule } from './config-indi-year-routing.module';
import { ConfigIndiYearComponent } from './config-indi-year.component';
import {
  CheckBoxSelectionService,
  DropDownListModule,
  MultiSelectModule,
} from '@syncfusion/ej2-angular-dropdowns';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import {
  PageService,
  SortService,
  FilterService,
  ToolbarService,
  EditService,
} from '@syncfusion/ej2-angular-treegrid';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ConfigIndiYearComponent],
  imports: [
    CommonModule,
    ConfigIndiYearRoutingModule,
    AlertModule,
    DropDownListModule,
    MultiSelectModule,
    FormsModule,
    TreeGridModule,
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    ToolbarService,
    EditService,
    CheckBoxSelectionService,
  ],
  exports: [],
})
export class ConfigIndiYearModule {}
