import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PageService,
  SortService,
  FilterService,
  ToolbarService,
  EditService
} from '@syncfusion/ej2-angular-grids';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import {
  PageService as TreePage,
  SortService as TreeSort,
  FilterService as TreeFilter,
  ToolbarService as TreeToolbar,
  EditService as TreeEdit,
  SelectionService as TreeSelection,
} from '@syncfusion/ej2-angular-treegrid';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ReportHistoryComponent } from './report-history.component';
import { ReportHistoryRoutingModule } from './report-history-routing.module';
@NgModule({
  declarations: [ReportHistoryComponent],
  imports: [
    CommonModule,
    DialogModule,
    GridModule,
    TreeGridModule,
    FormsModule,
    ReportHistoryRoutingModule
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    ToolbarService,
    EditService,
    TreePage,
    TreeEdit,
    TreeFilter,
    TreeSelection,
    TreeSort,
    TreeToolbar
  ],
})
export class ReportHistoryModule {}
