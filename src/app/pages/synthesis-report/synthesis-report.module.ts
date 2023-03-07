import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownListModule, MultiSelectModule  } from '@syncfusion/ej2-angular-dropdowns';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { SynthesisReportRoutingModule } from './synthesis-report-routing.module';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';



import {
  ToolbarService,
  LinkService,
  ImageService,
  HtmlEditorService,
} from '@syncfusion/ej2-angular-richtexteditor';
import {
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
} from '@syncfusion/ej2-angular-charts';
import { FormsModule } from '@angular/forms';
import { AlertModule } from '@shared/alert/alert.module';
import { SynthesisReportComponent } from './synthesis-report.component';
@NgModule({
    declarations: [SynthesisReportComponent],
    imports: [
      CommonModule,
      SynthesisReportRoutingModule,
      DropDownListModule,
      RichTextEditorModule,
      ChartModule,
      FormsModule,
      AlertModule,
      MultiSelectModule,
      DialogModule,
      GridModule
      
    ],
    providers: [
      ToolbarService,
      LinkService,
      ImageService,
      HtmlEditorService,
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
      GroupService
    ],
  })
  export class SynthesisReportModule {}
  