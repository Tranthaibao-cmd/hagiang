import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigIndicatorGroupTableRoutingModule } from './config-indicator-group-table-routing.module';
import { ConfigIndicatorGroupTableComponent } from './config-indicator-group-table.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import {
  PageService,
  SortService,
  SearchService,
  ToolbarService,
  EditService,
} from '@syncfusion/ej2-angular-grids';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { AlertModule } from '@shared/alert/alert.module';

@NgModule({
  declarations: [ConfigIndicatorGroupTableComponent],
  imports: [
    CommonModule,
    ConfigIndicatorGroupTableRoutingModule,
    DialogModule,
    GridModule,
    AlertModule
  ],
  exports: [ConfigIndicatorGroupTableComponent],
  providers: [
    PageService,
    SortService,
    SearchService,
    ToolbarService,
    EditService,
  ],
})
export class ConfigIndicatorGroupTableModule {}
