import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigIndicatorsTableComponent } from './config-indicators-table.component';
import {
  PageService,
  SortService,
  ToolbarService,
  EditService,
  TreeGridModule,
} from '@syncfusion/ej2-angular-treegrid';
import { ConfigIndicatorMeasureFormModule } from '@features/form/config-indicator-measure-form/config-indicator-measure-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagifyModule } from 'ngx-tagify';
import { ConfigIndicatorGroupTableRoutingModule } from '../config-indicator-group-table/config-indicator-group-table-routing.module';
import { ConfigIndicatorsTableRoutingModule } from './config-indicators-table-routing.module';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DropDownListModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { AlertModule } from '@shared/alert/alert.module';
@NgModule({
  declarations: [ConfigIndicatorsTableComponent],
  imports: [
    ConfigIndicatorsTableRoutingModule,
    CommonModule,
    TreeGridModule,
    // DialogModule,
    ConfigIndicatorMeasureFormModule,
    // ReactiveFormsModule,
    DialogModule,
    DropDownListModule,
    MultiSelectModule,
    FormsModule,
    TagifyModule,
    AlertModule,
  ],
  providers: [
    PageService,
    SortService,
    ToolbarService,
    EditService,
  ],
  exports: [ConfigIndicatorsTableComponent],
})
export class ConfigIndicatorsTableModule {}
