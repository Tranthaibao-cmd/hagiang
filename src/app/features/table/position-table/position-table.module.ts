import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import {
  PageService,
  EditService,
  SortService,
  ToolbarService,
  FilterService,
  CommandColumnService,
} from '@syncfusion/ej2-angular-treegrid';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { PositionTableRoutingModule } from './position-table-routing.module';
import { PositionTableComponent } from './position-table.component';
import { PositionDialogModule } from '@features/dialog/position-dialog/position-dialog.module';
import { AlertModule } from '@shared/alert/alert.module';

@NgModule({
  declarations: [PositionTableComponent],
  imports: [CommonModule, TreeGridModule, DialogModule, PositionTableRoutingModule, PositionDialogModule, AlertModule],
  providers: [
    PageService,
    SortService,
    ToolbarService,
    EditService,
    FilterService,
    CommandColumnService,
  ],
  exports: [PositionTableComponent],
})
export class PositionTableModule {}
