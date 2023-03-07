import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import {
  PageService,
  SortService,
  CommandColumnService,
  SearchService,
  ToolbarService,
  EditService,
} from '@syncfusion/ej2-angular-grids';
import { StatisticalChartSidebarComponent } from './statistical-chart-sidebar.component';
import { AlertModule } from '@shared/alert/alert.module';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
  declarations: [StatisticalChartSidebarComponent],
  imports: [CommonModule, GridModule, AlertModule,
    DropDownListModule,],
  providers: [
    PageService,
    SortService,
    CommandColumnService,
    SearchService,
    ToolbarService,
    EditService,
  ],
  exports: [StatisticalChartSidebarComponent],
})
export class StatisticalChartSidebarModule {}
