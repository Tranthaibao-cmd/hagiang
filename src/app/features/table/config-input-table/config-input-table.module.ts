import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigInputTableComponent } from './config-input-table.component';
import { ConfigInputTableRoutingModule } from './config-input-routing.module';
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
  declarations: [ConfigInputTableComponent],
  imports: [CommonModule, GridModule, DialogModule, ConfigInputTableRoutingModule, AlertModule],
  providers: [
    PageService,
    SortService,
    SearchService,
    ToolbarService,
    EditService,
  ],
  exports: [ConfigInputTableComponent],
})
export class ConfigInputTableModule {}
