import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticalComponent } from './statistical.component';
import { StatisticalChartSidebarModule } from '@features/statistical-chart-sidebar/statistical-chart-sidebar.module';
import { StatisticalRoutingModule } from './statistical-routing.module';
import { StatisticalTableModule } from '@features/table/statistical-table/statistical-table.module';
import { StatisticalChartModule } from '@features/statistical-chart/statistical-chart.module';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { StatisticalGridModule } from '@features/statistical-grid/statistical-grid.module';

@NgModule({
  declarations: [StatisticalComponent],
  imports: [
    CommonModule,
    StatisticalChartSidebarModule,
    StatisticalTableModule,
    StatisticalRoutingModule,
    StatisticalChartModule,
    StatisticalGridModule,
    DropDownListModule,
  ],
  providers: [],
})
export class StatisticalModule {}
