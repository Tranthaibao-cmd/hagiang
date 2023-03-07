import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StatisticalChartComponent } from './statistical-chart.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import {
  CategoryService,
  ChartModule,
  ColumnSeriesService,
  DataLabelService,
  DateTimeService,
  LegendService,
  LineSeriesService,
  MultiColoredLineSeriesService,
  MultiLevelLabelService,
  SelectionService,
  TooltipService,
  ZoomService,
  AreaSeriesService,
  ScrollBarService,
  RangeAreaSeriesService,
  StepAreaSeriesService,
  StackingAreaSeriesService,
  MultiColoredAreaSeriesService,
  StackingStepAreaSeriesService,
} from '@syncfusion/ej2-angular-charts';
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
import { AlertModule } from '@shared/alert/alert.module';
@NgModule({
  declarations: [StatisticalChartComponent],
  imports: [
    CommonModule,
    ChartModule,
    DropDownListModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    AlertModule,
    GridModule,
  ],
  providers: [
    CategoryService,
    ColumnSeriesService,
    DataLabelService,
    DateTimeService,
    LegendService,
    LineSeriesService,
    MultiColoredLineSeriesService,
    MultiLevelLabelService,
    SelectionService,
    TooltipService,
    ZoomService,
    AreaSeriesService,
    ScrollBarService,
    RangeAreaSeriesService,
    StepAreaSeriesService,
    StackingAreaSeriesService,
    MultiColoredAreaSeriesService,
    StackingStepAreaSeriesService,
    PageService,
    SortService,
    FilterService,
    GroupService,
    SearchService,
    ToolbarService,
    EditService,
    ForeignKeyService,
  ],
  exports: [StatisticalChartComponent],
})
export class StatisticalChartModule {}
