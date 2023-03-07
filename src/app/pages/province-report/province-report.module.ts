import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DropDownListModule,
  MultiSelectModule,
} from '@syncfusion/ej2-angular-dropdowns';
// import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
// import { ChartModule } from '@syncfusion/ej2-angular-charts';

// import {
//   ToolbarService,
//   LinkService,
//   ImageService,
//   HtmlEditorService,
// } from '@syncfusion/ej2-angular-richtexteditor';
// import {
//   CategoryService,
//   ColumnSeriesService,
//   DataLabelService,
//   DateTimeService,
//   LegendService,
//   LineSeriesService,
//   MultiColoredLineSeriesService,
//   MultiLevelLabelService,
//   SelectionService,
//   TooltipService,
//   ZoomService,
//   AreaSeriesService,
//   ScrollBarService,
//   RangeAreaSeriesService,
//   StepAreaSeriesService,
//   StackingAreaSeriesService,
//   MultiColoredAreaSeriesService,
//   StackingStepAreaSeriesService,
// } from '@syncfusion/ej2-angular-charts';
import {
  PageService,
  SortService,
  FilterService,
  EditService,
} from '@syncfusion/ej2-angular-treegrid';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';
import { AlertModule } from '@shared/alert/alert.module';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ProvinceReportComponent } from './province-report.component';
import { ProvinceReportRoutingModule } from './province-report-routing.module';
@NgModule({
  declarations: [ProvinceReportComponent],
  imports: [
    CommonModule,
    DropDownListModule,
    FormsModule,
    AlertModule,
    MultiSelectModule,
    DialogModule,
    TreeGridModule,
    FormsModule,
    NumericTextBoxModule,
    ProvinceReportRoutingModule
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    EditService,
  ],
})
export class ProvinceReportModule {}
