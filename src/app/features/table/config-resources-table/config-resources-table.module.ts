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
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ConfigResourcesTableRoutingModule } from './config-resources-table-routing.module';
import { ConfigResourcesTableComponent } from './config-resources-table.component';
import { AlertModule } from '@shared/alert/alert.module';

@NgModule({
  declarations: [ConfigResourcesTableComponent],
  imports: [CommonModule, GridModule, ConfigResourcesTableRoutingModule, DialogModule, AlertModule],
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
  exports: [ConfigResourcesTableComponent],
})
export class ConfigResourcesTableModule {}
