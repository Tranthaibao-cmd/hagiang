import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigUserTableComponent } from './config-user-table.component';
import { ConfigUserTableRoutingModule } from './config-user-routing.module';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import {
  PageService,
  SortService,
  SearchService,
  ToolbarService,
  EditService,
  FilterService,
  CommandColumnService,
} from '@syncfusion/ej2-angular-grids';
import { DialogModule, TooltipModule } from '@syncfusion/ej2-angular-popups';
import { InputAdminDialogModule } from '@features/dialog/input-admin-dialog/input-admin-dialog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { AlertModule } from '@shared/alert/alert.module';

@NgModule({
  declarations: [ConfigUserTableComponent],
  imports: [
    CommonModule,
    GridModule,
    DialogModule,
    ConfigUserTableRoutingModule,
    InputAdminDialogModule,
    ReactiveFormsModule,
    FormsModule,
    DropDownListModule,
    TooltipModule,
    AlertModule,
  ],
  providers: [
    PageService,
    SortService,
    SearchService,
    ToolbarService,
    EditService,
    FilterService,
    CommandColumnService,
  ],
  exports: [ConfigUserTableComponent],
})
export class ConfigUserTableModule {}
