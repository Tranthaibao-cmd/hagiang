import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigUserGroupTableComponent } from './config-user-group-table.component';
import { ConfigUserGroupTableRoutingModule } from './config-user-group-routing.module';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import {
  PageService,
  EditService,
  SortService,
  ToolbarService,
  FilterService,
} from '@syncfusion/ej2-angular-treegrid';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { AlertModule } from '@shared/alert/alert.module';
@NgModule({
  declarations: [ConfigUserGroupTableComponent],
  imports: [CommonModule, TreeGridModule, DialogModule, ConfigUserGroupTableRoutingModule, AlertModule],
  providers: [
    PageService,
    SortService,
    ToolbarService,
    EditService,
    FilterService
  ],
  exports: [ConfigUserGroupTableComponent],
})
export class ConfigUserGroupTableModule {}
