import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ConfigUnitTableComponent } from './config-unit-table.component';
import { ConfigUnitTableRoutingModule } from './config-unit-table-routing.module';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { AlertModule } from '@shared/alert/alert.module';

@NgModule({
  declarations: [ConfigUnitTableComponent],
  imports: [CommonModule, GridModule, ConfigUnitTableRoutingModule, DialogModule, AlertModule],
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
  exports: [ConfigUnitTableComponent],
})
export class ConfigUnitTableModule {}
